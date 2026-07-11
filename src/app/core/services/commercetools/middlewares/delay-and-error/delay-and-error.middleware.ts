import errorContent from '@/app/content/services/commercetools/errors.json' with { type: 'json' };
import type { MiddlewareRequest, MiddlewareResponse, Next } from '@commercetools/ts-client';

import { NotificationService } from '../../../notification';

const RESPONSE_DELAY_MS = 700;
const NETWORK_ERROR_NOTIFICATION_COOLDOWN_MS = 3000;
const HTTP_STATUS_DESCRIPTIONS: Record<string, string> = errorContent.http.statusDescriptions;

export const delayAndErrorMiddleware = (notification: NotificationService) => {
  let lastNetworkErrorNotificationAt = 0;

  return (next: Next) =>
    async (request: MiddlewareRequest): Promise<MiddlewareResponse> => {
      let response: MiddlewareResponse;

      try {
        response = await next(request);
      } catch (error) {
        lastNetworkErrorNotificationAt = handleRequestError(
          error,
          notification,
          lastNetworkErrorNotificationAt,
        );
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, RESPONSE_DELAY_MS));

      handleResponseErrors(response, notification);

      return response;
    };
};

const handleResponseErrors = (
  response: MiddlewareResponse,
  notification: NotificationService,
): void => {
  if (response.error || (response.statusCode && response.statusCode >= 400)) {
    const status = response.statusCode;
    const errorMessage = getResponseErrorMessage(response);

    handleGlobalErrors(status, errorMessage, notification);

    throw response.error || new Error(errorMessage);
  }

  const graphqlMessage = getGraphqlErrorMessage(response.body);

  if (graphqlMessage) {
    notification.add({
      heading: errorContent.headings.graphql,
      description: graphqlMessage,
      status: 'error',
    });

    throw new Error(graphqlMessage);
  }
};

const handleRequestError = (
  error: unknown,
  notification: NotificationService,
  lastNetworkErrorNotificationAt: number,
): number => {
  const status = getErrorStatus(error);

  if (status) {
    handleGlobalErrors(status, getErrorMessage(error), notification);
    return lastNetworkErrorNotificationAt;
  }

  if (!shouldNotifyNetworkError(lastNetworkErrorNotificationAt)) {
    return lastNetworkErrorNotificationAt;
  }

  notification.add({
    heading: errorContent.headings.network,
    description: errorContent.network.description,
    status: 'error',
  });

  return Date.now();
};

const shouldNotifyNetworkError = (lastNotificationAt: number): boolean =>
  Date.now() - lastNotificationAt > NETWORK_ERROR_NOTIFICATION_COOLDOWN_MS;

const handleGlobalErrors = (
  status: number | undefined,
  message: string,
  notification: NotificationService,
): void => {
  const notify = (description: string): void => {
    notification.add({
      heading: errorContent.headings.ecommerce,
      description,
      status: 'error',
    });
  };

  if (status && HTTP_STATUS_DESCRIPTIONS[String(status)]) {
    notify(HTTP_STATUS_DESCRIPTIONS[String(status)]);
    return;
  }

  notify(formatDefaultHttpErrorDescription(status, message));
};

const getResponseErrorMessage = (response: MiddlewareResponse): string =>
  response.error?.message ||
  getRecordMessage(response.body) ||
  errorContent.fallbacks.responseMessage;

const getGraphqlErrorMessage = (body: unknown): string | undefined => {
  if (!isRecord(body) || !Array.isArray(body['errors'])) {
    return undefined;
  }

  const [firstError] = body['errors'];

  return getRecordMessage(firstError) || errorContent.fallbacks.graphqlMessage;
};

const getErrorStatus = (error: unknown): number | undefined => {
  if (!isRecord(error)) {
    return undefined;
  }

  const status = error['status'] ?? error['statusCode'];

  return typeof status === 'number' ? status : undefined;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return getRecordMessage(error) || errorContent.fallbacks.responseMessage;
};

const formatDefaultHttpErrorDescription = (status: number | undefined, message: string): string =>
  errorContent.http.defaultDescription
    .replace('{status}', String(status || errorContent.fallbacks.fetchStatus))
    .replace('{message}', message);

const getRecordMessage = (value: unknown): string | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }

  const message = value['message'];

  return typeof message === 'string' ? message : undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

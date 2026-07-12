import { CommercetoolsService } from './commercetools.service';

const mockCart = {
  id: 'mock-cart',
  version: 1,
  lineItems: [],
  totalPrice: { centAmount: 0, currencyCode: 'USD' as const },
};

const buildMock = (): unknown => ({
  withProjectKey: () => ({
    graphql: () => ({
      post: () => ({
        execute: () =>
          Promise.resolve({
            body: { data: { product: null }, errors: [] },
          }),
      }),
    }),
    me: () => ({
      activeCart: () => ({
        get: () => ({
          execute: () => Promise.reject({ status: 404 }),
        }),
      }),
      carts: () => ({
        post: () => ({
          execute: () => Promise.resolve({ body: mockCart }),
        }),
        withId: () => ({
          post: () => ({
            execute: () => Promise.resolve({ body: { ...mockCart, version: 2 } }),
          }),
        }),
      }),
    }),
    products: () => ({
      get: () => ({
        execute: () => Promise.resolve({ body: { results: [], total: 0 } }),
      }),
    }),
    productProjectionsSearch: () => ({
      get: () => ({
        execute: () => Promise.resolve({ body: { results: [], total: 0 } }),
      }),
    }),
  }),
});

export const mockCommercetoolsService: Pick<CommercetoolsService, 'apiRoot'> = {
  apiRoot: buildMock() as unknown as CommercetoolsService['apiRoot'],
};

export const COMMERCE_TOOLS_MOCK_PROVIDERS = [
  { provide: CommercetoolsService, useValue: mockCommercetoolsService },
];

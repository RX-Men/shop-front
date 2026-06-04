import rawFooter from './footer.json' with { type: 'json' };

import { ICON_NAME } from '@/app/shared/components/icon/icon.constants';

import type { IconName } from '@/app/shared/components/icon/icon.types';

export const FOOTER_LINK_VARIANT = {
  routerLink: 'router-link',
  externalLink: 'external-link',
  iconExternalLink: 'icon-external-link',
} as const;

type FooterLinkVariant = (typeof FOOTER_LINK_VARIANT)[keyof typeof FOOTER_LINK_VARIANT];

interface BaseLink<T extends FooterLinkVariant, U extends string = string> {
  variant: T;
  name: U;
  href: string;
}

type RouterLink = BaseLink<typeof FOOTER_LINK_VARIANT.routerLink>;
type ExternalLink = BaseLink<typeof FOOTER_LINK_VARIANT.externalLink>;
interface IconExternalLink extends BaseLink<typeof FOOTER_LINK_VARIANT.iconExternalLink, IconName> {
  ariaLabel: string;
}

export type FooterLink = RouterLink | ExternalLink | IconExternalLink;

interface FooterBlock<T extends FooterLink> {
  title: string;
  content: T[];
}

export interface FooterData {
  description: string;
  brand: string;
  date: string;
  notice: string;
  sitemap: FooterBlock<RouterLink | ExternalLink>;
  legal: FooterBlock<RouterLink | ExternalLink>;
  customer: FooterBlock<RouterLink | ExternalLink>;
  social: FooterBlock<IconExternalLink>;
}

const isObject = (data: unknown): data is Record<string, unknown> =>
  typeof data === 'object' && data !== null;

const isValidIconName = (name: unknown): name is IconName =>
  typeof name === 'string' && Object.hasOwn(ICON_NAME, name);

const isValidBaseLink = (
  data: unknown,
  expectedVariant: FooterLinkVariant,
): data is BaseLink<FooterLinkVariant> =>
  isObject(data) &&
  data['variant'] === expectedVariant &&
  typeof data['name'] === 'string' &&
  typeof data['href'] === 'string';

const isValidRouterLink = (data: unknown): data is RouterLink =>
  isValidBaseLink(data, FOOTER_LINK_VARIANT.routerLink);

const isValidExternalLink = (data: unknown): data is ExternalLink =>
  isValidBaseLink(data, FOOTER_LINK_VARIANT.externalLink);

const isValidIconExternalLink = (data: unknown): data is IconExternalLink =>
  isValidBaseLink(data, FOOTER_LINK_VARIANT.iconExternalLink) &&
  isValidIconName(data.name) &&
  'ariaLabel' in data &&
  typeof data.ariaLabel === 'string';

const isTextLinkBlock = (block: unknown): block is FooterData['sitemap'] => {
  if (!isObject(block)) {
    return false;
  }

  const { title, content } = block;

  return (
    typeof title === 'string' &&
    Array.isArray(content) &&
    content.every((item) => isValidRouterLink(item) || isValidExternalLink(item))
  );
};

const isIconLinkBlock = (block: unknown): block is FooterData['social'] => {
  if (!isObject(block)) {
    return false;
  }

  const { title, content } = block;

  return (
    typeof title === 'string' && Array.isArray(content) && content.every(isValidIconExternalLink)
  );
};

export const isValidFooterData = (data: unknown): data is FooterData => {
  if (!isObject(data)) {
    return false;
  }

  const { description, brand, date, notice, sitemap, legal, customer, social } = data;

  return (
    typeof description === 'string' &&
    typeof brand === 'string' &&
    typeof date === 'string' &&
    typeof notice === 'string' &&
    isTextLinkBlock(sitemap) &&
    isTextLinkBlock(legal) &&
    isTextLinkBlock(customer) &&
    isIconLinkBlock(social)
  );
};

export const assertFooterData = (value: unknown): FooterData => {
  if (!isValidFooterData(value)) {
    throw new Error('Invalid footer content schema');
  }

  return value;
};

export const footerContent = assertFooterData(rawFooter);

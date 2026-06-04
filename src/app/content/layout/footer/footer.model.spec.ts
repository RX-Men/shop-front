import { assertFooterData } from './footer.model';

import type { FooterData } from './footer.model';

describe('footer.model', () => {
  it('returns validated footer data', () => {
    const validFooterData: FooterData = {
      description: 'Footer description',
      brand: 'ShopFront-Comics',
      date: '2026',
      notice: 'All rights reserved',
      sitemap: {
        title: 'Sitemap',
        content: [{ variant: 'router-link', name: 'Home', href: '/' }],
      },
      legal: {
        title: 'Legal details',
        content: [{ variant: 'external-link', name: 'Privacy policy', href: '#' }],
      },
      customer: {
        title: 'Customer service',
        content: [{ variant: 'external-link', name: 'Returns and refunds', href: '#' }],
      },
      social: {
        title: 'Stay in touch',
        content: [
          {
            variant: 'icon-external-link',
            name: 'facebook',
            href: '#',
            ariaLabel: 'Visit our Facebook page',
          },
        ],
      },
    };

    expect(assertFooterData(validFooterData)).toEqual(validFooterData);
  });

  it('throws on invalid footer data', () => {
    const invalidFooterData = {
      brand: 'ShopFront-Comics',
      date: '2026',
      notice: 'All rights reserved',
      sitemap: {
        title: 'Sitemap',
        content: [{ variant: 'router-link', name: 'Home', href: '/' }],
      },
      legal: {
        title: 'Legal details',
        content: [{ variant: 'external-link', name: 'Privacy policy', href: '#' }],
      },
      customer: {
        title: 'Customer service',
        content: [{ variant: 'external-link', name: 'Returns and refunds', href: '#' }],
      },
      social: {
        title: 'Stay in touch',
        content: [
          {
            variant: 'icon-external-link',
            name: 'facebook',
            href: '#',
            ariaLabel: 'Visit our Facebook page',
          },
        ],
      },
    };

    expect(() => assertFooterData(invalidFooterData)).toThrow('Invalid footer content schema');
  });

  it('throws if text link is passed into social block', () => {
    const invalidFooterData = {
      description: 'Footer description',
      brand: 'ShopFront-Comics',
      date: '2026',
      notice: 'All rights reserved',
      sitemap: {
        title: 'Sitemap',
        content: [{ variant: 'router-link', name: 'Home', href: '/' }],
      },
      legal: {
        title: 'Legal details',
        content: [{ variant: 'external-link', name: 'Privacy policy', href: '#' }],
      },
      customer: {
        title: 'Customer service',
        content: [{ variant: 'external-link', name: 'Returns and refunds', href: '#' }],
      },
      social: {
        title: 'Stay in touch',
        content: [
          {
            variant: 'icon-external-link',
            name: 'facebook',
            href: '#',
            ariaLabel: 'Visit our Facebook page',
          },
          {
            title: 'Sitemap',
            content: [{ variant: 'router-link', name: 'Home', href: '/' }],
          },
        ],
      },
    };

    expect(() => assertFooterData(invalidFooterData)).toThrow('Invalid footer content schema');
  });

  it('throws if icon link is passed into text link blocks', () => {
    const invalidFooterData = {
      description: 'Footer description',
      brand: 'ShopFront-Comics',
      date: '2026',
      notice: 'All rights reserved',
      sitemap: {
        title: 'Sitemap',
        content: [
          { variant: 'router-link', name: 'Home', href: '/' },
          {
            variant: 'icon-external-link',
            name: 'facebook',
            href: '#',
            ariaLabel: 'Visit our Facebook page',
          },
        ],
      },
      legal: {
        title: 'Legal details',
        content: [{ variant: 'external-link', name: 'Privacy policy', href: '#' }],
      },
      customer: {
        title: 'Customer service',
        content: [{ variant: 'external-link', name: 'Returns and refunds', href: '#' }],
      },
      social: {
        title: 'Stay in touch',
        content: [
          {
            variant: 'icon-external-link',
            name: 'facebook',
            href: '#',
            ariaLabel: 'Visit our Facebook page',
          },
        ],
      },
    };

    expect(() => assertFooterData(invalidFooterData)).toThrow('Invalid footer content schema');
  });
});

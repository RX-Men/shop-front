import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.us-central1.gcp.commercetools.com/shopfront-comics/graphql': {
        headers: {
          Authorization: `Bearer ${import.meta.env['VITE_CTP_AUTHORIZATION_TOKEN']}`,
        },
      },
    },
  ],
  documents: 'src/**/*.ts',
  generates: {
    'src/app/core/graphql/generated.types.ts': {
      plugins: ['typescript-operations'],
    },
  },
};

export default config;

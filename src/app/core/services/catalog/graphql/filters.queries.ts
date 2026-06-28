import gql from 'graphql-tag';

export const GET_CATALOG_FILTERS = gql`
  query GetCatalogFilters {
    productType(key: "comic-book") {
      id
      key
      name
      attributeDefinitions(
        includeNames: ["cover-artist", "genre", "penciller", "publisher", "writer"]
        sort: "name asc"
      ) {
        results {
          name
          label(acceptLanguage: "en-US")
          type {
            ... on EnumAttributeDefinitionType {
              __typename
              values(sort: "label asc") {
                results {
                  key
                  label
                }
              }
            }
          }
        }
      }
    }
  }
`;

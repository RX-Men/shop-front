import gql from 'graphql-tag';

export const GET_PRODUCTS_SEARCH_BY_TEXT = gql`
  query GetProductsSearchByText($searchQuery: SearchValueType!) {
    productsSearch(
      query: {
        or: [
          {
            wildcard: {
              field: "name"
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "description"
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "attributes.publisher.label"
              fieldType: enum
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "attributes.genre.label"
              fieldType: enum
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "attributes.writer.label"
              fieldType: enum
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "attributes.penciller.label"
              fieldType: enum
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
          {
            wildcard: {
              field: "attributes.cover-artist.label"
              fieldType: enum
              value: $searchQuery
              language: "en-US"
              caseInsensitive: true
            }
          }
        ]
      }
    ) {
      total
      results {
        product {
          id
          masterData {
            current {
              name(locale: "en-US")
              description(locale: "en-US")
              attributesRaw {
                name
                value
              }
              masterVariant {
                price(currency: "USD") {
                  value {
                    centAmount
                  }
                }
                images {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

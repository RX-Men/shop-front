import gql from 'graphql-tag';

export const GET_NEW_PRODUCTS = gql`
  query GetNewProducts($limit: Int!) {
    productsSearch(limit: $limit, sort: { field: "createdAt", order: desc, fieldType: datetime }) {
      limit
      results {
        product {
          masterData {
            current {
              name(locale: "en-US")
              masterVariant {
                images {
                  url
                }
                price(currency: "USD") {
                  value {
                    centAmount
                  }
                }
                sku
              }
              attributesRaw {
                name
                value
              }
            }
          }
          id
        }
      }
    }
  }
`;

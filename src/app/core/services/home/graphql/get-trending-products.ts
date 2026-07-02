import gql from 'graphql-tag';

export const GET_TRENDING_PRODUCTS = gql`
  query GetTrendingProducts {
    productSelection(key: "trending-products") {
      productRefs {
        results {
          product {
            id
            masterData {
              current {
                name(locale: "en-US")
                masterVariant {
                  sku
                  price(currency: "USD") {
                    value {
                      centAmount
                    }
                  }
                  images {
                    url
                  }
                }
                attributesRaw {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

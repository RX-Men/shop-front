import gql from 'graphql-tag';

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($productId: String!) {
    product(id: $productId) {
      id
      masterData {
        current {
          attributesRaw {
            name
            value
          }
          description(locale: "en-US")
          name(locale: "en-US")
          allVariants {
            images {
              url
            }
            prices {
              value {
                centAmount
              }
            }
            sku
          }
        }
      }
    }
  }
`;

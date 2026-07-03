import gql from 'graphql-tag';

export const GET_CATALOG_PRODUCTS = gql`
  query GetCatalogProducts(
    $postFilter: SearchQueryInput
    $sort: [SearchSortingInput!]
    $limit: Int
    $offset: Int
  ) {
    productsSearch(limit: $limit, offset: $offset, sort: $sort, postFilter: $postFilter) {
      offset
      limit
      total
      results {
        product {
          id
          masterData {
            current {
              name(locale: "en-US")
              attributesRaw {
                name
                value
              }
              masterVariant {
                images {
                  url
                }
                sku
                price(currency: "USD") {
                  discounted {
                    value {
                      centAmount
                    }
                    discount {
                      value {
                        ... on RelativeDiscountValue {
                          __typename
                          permyriad
                        }
                      }
                    }
                  }
                  value {
                    centAmount
                  }
                }
                availability {
                  noChannel {
                    availableQuantity
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

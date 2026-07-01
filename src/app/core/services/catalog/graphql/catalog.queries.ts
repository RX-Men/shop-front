import gql from 'graphql-tag';

export const GET_CATALOG = gql`
  query GetCatalog(
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
              allVariants {
                images {
                  url
                }
                prices {
                  value {
                    centAmount
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

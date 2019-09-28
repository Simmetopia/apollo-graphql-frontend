import { gql } from 'apollo-boost';
export const item_fragment = gql`
  fragment item_fragment on Item {
    id
    saberPart
    partDescription
    partName
    price
  }
`;

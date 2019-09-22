import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { LocalUser } from './__generated__/LocalUser';

const localUserQuery = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

// Since we are quering from local state, we can "safely" use ! operator
export const useLocalData = () => {
  const { data } = useQuery<LocalUser>(localUserQuery)!;
  return data!.localUser!;
};

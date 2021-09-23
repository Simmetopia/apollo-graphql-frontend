import { useQuery } from '@apollo/client';

export const useSWQuery: typeof useQuery = (a, b) => {
  return useQuery(a, b);
};

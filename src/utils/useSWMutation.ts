import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';

export const useSWMutaion: typeof useMutation = (a, b) => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(a, {
    onCompleted: () => enqueueSnackbar('Success', { variant: 'success' }),
    onError: (error) => enqueueSnackbar(error.graphQLErrors[0].message, { variant: 'error' }),
    fetchPolicy: 'network-only',
    ...b,
  });
};

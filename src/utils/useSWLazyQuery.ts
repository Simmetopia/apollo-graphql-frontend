import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';


export const useSWLazyQuery: typeof useLazyQuery = (a, b) => {
    const { enqueueSnackbar } = useSnackbar();
    return useLazyQuery(a, {
        onError: (error) => enqueueSnackbar(error.graphQLErrors[0].message, { variant: 'error' }),
        fetchPolicy: 'network-only',
        ...b,
    });
};
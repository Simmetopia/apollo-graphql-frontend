import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';


export const useSWMutation: typeof useMutation = (a, b) => {
    const {enqueueSnackbar} = useSnackbar();
    return useMutation(a, {
        onError: (error) => enqueueSnackbar(error.graphQLErrors[0].message, {variant: 'error'}),
        fetchPolicy: 'network-only',
        ...b,
    });
};
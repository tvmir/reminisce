import { QueryClient } from 'react-query';

// Creating a query client to cache queries and mutations in memory/local storage
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      staleTime: Infinity,
    },
  },
});

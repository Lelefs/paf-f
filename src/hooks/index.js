import { QueryClient, QueryClientProvider } from 'react-query';

import { SidebarProvider } from './sidebar';

const queryClient = new QueryClient();

const AppProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>{children}</SidebarProvider>
  </QueryClientProvider>
);

export default AppProvider;

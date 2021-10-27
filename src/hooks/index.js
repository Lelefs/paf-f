import { QueryClient, QueryClientProvider } from 'react-query';

import { SidebarProvider } from './sidebar';
import { UsersProvider } from './users';

const queryClient = new QueryClient();

const AppProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UsersProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </UsersProvider>
  </QueryClientProvider>
);

export default AppProvider;

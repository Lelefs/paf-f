import { Flex, SimpleGrid } from '@chakra-ui/react';

import { useUsers } from '../hooks/users';

import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';
import { SEO } from '../components/SEO';
import { UserChart } from '../components/UserChart';

export default function Dashboard() {
  const { data, isLoading } = useUsers();

  return (
    <Flex direction="column" h="100vh">
      <SEO title="Início" />

      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            {data.users.map((user, index) => (
              <UserChart key={index} user={user} />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </Flex>
  );
}

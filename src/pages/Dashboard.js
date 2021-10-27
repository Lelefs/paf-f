import { Flex, SimpleGrid, Stack, Heading } from '@chakra-ui/react';

import { useUsers } from '../hooks/users';

import { CustomModal } from '../components/CustomModal';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';
import { SEO } from '../components/SEO';
import { Current } from '../components/Current';

export default function Dashboard() {
  const { users, isLoading } = useUsers();

  return (
    <Flex direction="column" h="100vh">
      <SEO title="Início" />

      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Stack w="100%" spacing="4">
            <Flex>
              <Heading>Informações atuais</Heading>
              <CustomModal />
            </Flex>
            <SimpleGrid
              flex="1"
              gap="4"
              minChildWidth="390px"
              align="flex-start"
            >
              {users.map((user, index) => (
                <Current key={index} user={user} />
              ))}
            </SimpleGrid>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
}

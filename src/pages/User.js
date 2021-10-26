import { Flex, Text } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { SEO } from '../components/SEO';

export default function User({ match }) {
  const { username } = match.params;
  return (
    <Flex direction="column" h="100vh">
      <SEO title={username} />

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex>
          <Text>User {username} funcionando</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

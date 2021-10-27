import {
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { useInfos } from '../hooks/infos';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { SEO } from '../components/SEO';
import { Loader } from '../components/Loader';

export default function User({ match }) {
  const { username } = match.params;
  const localUsers = JSON.parse(localStorage.getItem('@paf:users'));
  const user = localUsers.filter(u => u.name === username);
  const { data, isLoading } = useInfos(user[0]._id);
  console.log(data);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex direction="column" h="100vh">
      <SEO title={username} />

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Flex direction="column">
          <Heading>{username}</Heading>

          <Table variant="simple" w="fit-content" mt="4">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Peso</Th>
                <Th>Altura</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.infos.map(info => (
                <Tr key={info._id}>
                  <Td>{info.formattedDate}</Td>
                  <Td>{info.weight} kg</Td>
                  {username === 'Daniel' ? (
                    <Td>{info.height * 100} cm</Td>
                  ) : (
                    <Td>{info.height} m</Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
}

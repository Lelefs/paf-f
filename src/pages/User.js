import {
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

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
              {data.infos.map((info, index) => (
                <Tr key={info._id}>
                  <Td>{info.formattedDate}</Td>
                  <Td>
                    {info.weight.toFixed(2)} kg
                    {index !== data.infos.length - 1 &&
                      info.weight - data.infos[index + 1].weight !== 0 && (
                        <>
                          {info.weight > data.infos[index + 1].weight ? (
                            <Icon
                              as={IoMdArrowDropup}
                              fontSize="20"
                              color="green.600"
                              ml="2"
                            />
                          ) : (
                            <Icon
                              as={IoMdArrowDropdown}
                              fontSize="20"
                              color="red.600"
                              ml="2"
                            />
                          )}
                        </>
                      )}
                  </Td>
                  {info.height < 1 ? (
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

import { Flex, SimpleGrid, Stack, Heading, Button } from '@chakra-ui/react';

import { useState } from 'react';
import { useUsers } from '../hooks/users';

import { CustomModal } from '../components/CustomModal';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';
import { SEO } from '../components/SEO';
import { Current } from '../components/Current';
import { CurrentActivity } from '../components/CurrentActivity';
import api from '../services/api';

export default function Dashboard() {
  const { users, isLoading } = useUsers();
  const [loading, setLoading] = useState();

  async function handleCreateActivity(userId) {
    setLoading(true);

    try {
      await api.post('/activities', {
        activity: 'Cocô',
        user: userId,
      });

      setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }, 200);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  }

  return (
    <Flex direction="column" h="100vh">
      <SEO title="Início" />

      <Header />

      {isLoading || loading ? (
        <Loader />
      ) : (
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={['2', '2', '6']}>
          <Sidebar />

          <Stack w="100%" spacing="4">
            <Flex>
              <Heading>Atual</Heading>

              <CustomModal />

              <Button
                bg="green.800"
                ml="4"
                _hover={{ bg: 'green.700' }}
                variant="solid"
                onClick={() => handleCreateActivity('61770bf550f09139d0715e68')}
              >
                Dani
                <br />
                fez cocô
              </Button>

              <Button
                bg="green.800"
                ml="4"
                _hover={{ bg: 'green.700' }}
                variant="solid"
                onClick={() => handleCreateActivity('6717b9de7212f8834187e9d4')}
              >
                Samuca
                <br />
                fez cocô
              </Button>
            </Flex>

            <SimpleGrid
              flex="1"
              gap="6"
              minChildWidth="380px"
              align="flex-start"
            >
              {users.map((user, index) => {
                if (index !== 1) {
                  return (
                    <>
                      <CurrentActivity
                        key={`0${index}-${user._id}-activity`}
                        user={user}
                      />
                    </>
                  );
                }
              })}

              {users.map((user, index) => {
                return <Current key={`0${index}-${user._id}`} user={user} />;
              })}
            </SimpleGrid>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
}

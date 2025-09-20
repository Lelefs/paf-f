import { Stack, Icon, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiHome2Line, RiUser3Line } from 'react-icons/ri';

import { useUsers } from '../../hooks/users';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { pathname } = useLocation();
  const { users, isLoading } = useUsers();

  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="Geral">
        <Link to="/" className={pathname === '/' ? 'link active' : 'link'}>
          <Icon as={RiHome2Line} fontSize="20" />
          <Text ml="4" fontWeight="medium">
            Início
          </Text>
        </Link>

        <Link
          to="/calculadora"
          className={pathname === '/calculadora' ? 'link active' : 'link'}
        >
          <Icon as={RiHome2Line} fontSize="20" />
          <Text ml="4" fontWeight="medium">
            Calculadora
          </Text>
        </Link>
      </NavSection>

      {!isLoading && (
        <NavSection title="Usuários">
          {users.map((user, index) => (
            <Link
              key={`0${index}-sidenavbar`}
              to={`/user/${user.name}`}
              className={
                pathname === `/user/${user.name}` ? 'link active' : 'link'
              }
            >
              <Icon as={RiUser3Line} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                {user.name}
              </Text>
            </Link>
          ))}
        </NavSection>
      )}
    </Stack>
  );
}

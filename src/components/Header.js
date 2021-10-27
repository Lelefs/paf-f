import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebar } from '../hooks/sidebar';
import { Logo } from './Logo';

export function Header() {
  const { openMenu } = useSidebar();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
      borderBottom="1px"
      borderBottomColor="white"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Abrir menu"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={openMenu}
          mr="2"
        />
      )}

      <Logo />
    </Flex>
  );
}

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebar } from '../../hooks/sidebar';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  const { menuOpened, closeMenu } = useSidebar();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={menuOpened} placement="left" onClose={closeMenu}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}

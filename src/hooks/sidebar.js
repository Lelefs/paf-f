import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SidebarContext = createContext({
  menuOpened: false,
  openMenu: () => {},
  closeMenu: () => {},
});

export const SidebarProvider = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpened(false);
  }, [pathname]);

  function openMenu() {
    setMenuOpened(true);
  }

  function closeMenu() {
    setMenuOpened(false);
  }

  return (
    <SidebarContext.Provider value={{ menuOpened, openMenu, closeMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

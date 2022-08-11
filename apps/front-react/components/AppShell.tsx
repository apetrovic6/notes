import { useState } from 'react';
import { AppShell as MantineAppShell, useMantineTheme } from '@mantine/core';
import { Header } from './Header';
import { useRouter } from 'next/router';
import { Navbar } from './Navbar';

export default function AppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();

  return (
    <MantineAppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={pathname.includes('dashboard') && <Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      {children}
    </MantineAppShell>
  );
}

import { useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Box,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Menu,
  ActionIcon,
  Avatar,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';

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
      navbar={
        pathname.includes('dashboard') && (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        )
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {pathname.includes('dashboard') && (
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened(o => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
              )}

              <Text
                variant={'gradient'}
                size={'xl'}
                gradient={{ from: 'yellow', to: 'green', deg: 50 }}
              >
                Notes
              </Text>
            </Box>
            <span>
              {' '}
              <Menu width={200} shadow="md" radius={'md'}>
                <Menu.Target>
                  <ActionIcon>
                    <Avatar radius={'xl'} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item component={NextLink} href={'/auth/login'}>
                    Login
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </span>
          </div>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  );
}

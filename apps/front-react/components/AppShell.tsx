import { useState } from 'react';
import {
  AppShell as MantineAppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  NavLink,
  Box,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Menu,
  ActionIcon,
  Avatar,
  Skeleton,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';
import { useGetFoldersQuery, useMeQuery } from '@notes/apollo';

export default function AppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();

  const { data, loading } = useGetFoldersQuery();

  const { data: userData } = useMeQuery();
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
            <Text>Folders</Text>

            {loading && (
              <>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </>
            )}

            {data?.folders &&
              data?.folders?.map(folder => (
                <NavLink
                  label={folder.title}
                  key={folder.id}
                  childrenOffset={28}
                >
                  <NavLink label="First child link" />
                </NavLink>
              ))}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {userData && (
                <Text mr={10}>
                  {' '}
                  Welcome {userData?.me?.email.split('@')[0]}
                </Text>
              )}
              <Menu width={200} shadow="md" radius={'md'}>
                <Menu.Target>
                  <ActionIcon>
                    <Avatar radius={'xl'} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {!userData && (
                    <Menu.Item component={NextLink} href={'/auth/login'}>
                      Login
                    </Menu.Item>
                  )}
                  {userData && (
                    <Menu.Item component={NextLink} href={'/auth/logout'}>
                      Logout
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
            </Box>
          </div>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  );
}

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
  useMantineColorScheme,
} from '@mantine/core';
import {
  GetFoldersQueryResult,
  useGetFoldersQuery,
  useMeQuery,
} from '@notes/apollo';

import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';

import { IconCirclePlus, IconMoon, IconSunHigh } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import Link from 'next/link';

export default function AppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { pathname, push } = useRouter();

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
            width={{ sm: 200, lg: 310 }}
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
                <Box
                  key={folder.id}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      position: 'relative',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'block', width: '90%' }}>
                      <NavLink
                        variant={'filled'}
                        label={folder.title}
                        key={folder.id}
                        childrenOffset={20}
                      >
                        {folder?.notes.map(note => (
                          <Link
                            key={note.id}
                            href={{
                              pathname: '/dashboard/note',
                              query: { noteId: note.id },
                            }}
                            as={'/dashboard/note'}
                            passHref
                          >
                            <NavLink
                              key={note.id}
                              label={note.title}
                              component={'a'}
                            />
                          </Link>
                        ))}
                      </NavLink>
                    </div>
                    <IconCirclePlus
                      style={{ position: 'absolute', right: '-5', top: '8' }}
                      size={20}
                      onClick={() => {
                        showNotification({
                          title: 'Create new note',
                          message: folder.id,
                        });

                        push(
                          {
                            pathname: '/dashboard/new',
                            query: { folderId: folder.id },
                          },
                          '/dashboard/new'
                        );
                      }}
                    />
                  </Box>
                </Box>
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
              <ActionIcon
                mx={10}
                variant="subtle"
                color={dark ? 'yellow' : 'blue'}
                radius={'xl'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <IconSunHigh size={28} /> : <IconMoon size={28} />}
              </ActionIcon>
            </Box>
          </div>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  );
}

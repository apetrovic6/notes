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
  Skeleton,
  Button,
  useMantineColorScheme,
} from '@mantine/core';
import {
  MeDocument,
  useCreateFolderMutation,
  useGetFoldersQuery,
  useLogoutMutation,
  useMeQuery,
} from '@notes/apollo';

import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';

import { IconCheck, IconMoon, IconSunHigh } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { openModal } from '@mantine/modals';
import { CreateUpdateFolder } from './CreateUpdateFolder';

import { FolderList } from './folder-list/folder-list.component';
export default function AppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { pathname, replace } = useRouter();

  const { data, loading } = useGetFoldersQuery();

  const { data: userData } = useMeQuery();

  const [logout, { client, data: logoutCall }] = useLogoutMutation({
    refetchQueries: [{ query: MeDocument }],
  });

  const [createFolder] = useCreateFolderMutation({
    refetchQueries: ['getFolders'],
  });

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
            <Button
              fullWidth
              mb={10}
              variant="light"
              radius="lg"
              onClick={() =>
                openModal({
                  title: 'Create Folder',
                  children: (
                    <>
                      <CreateUpdateFolder
                        mutation={() => createFolder}
                        payload={{
                          variables: { createFolderInput: { title: null } },
                        }}
                      />
                    </>
                  ),
                })
              }
            >
              Create Folder
            </Button>

            {loading && (
              <>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </>
            )}

            {data?.folders && <FolderList folders={data.folders} />}
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
              {loggedInR && (
                <MediaQuery smallerThan={'xs'} styles={{ display: 'none' }}>
                  <Text mr={10}>Welcome {userR?.email.split('@')[0]}</Text>
                </MediaQuery>
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
                    <Menu.Item
                      onClick={async () => {
                        // TODO fix logout
                        logout({
                          onCompleted: async res => {
                            client.clearStore();
                            replace('/auth/login');
                          },
                        });
                        logoutCall &&
                          showNotification({
                            title: 'Success',
                            message: "You've successfully signed out",
                            color: 'teal',
                            icon: <IconCheck size={18} />,
                          });
                      }}
                    >
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

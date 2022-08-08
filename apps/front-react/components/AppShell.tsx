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
  SegmentedControl,
} from '@mantine/core';
import {
  useCreateFolderMutation,
  useGetFoldersQuery,
  useLogoutMutation,
  useGetSharedNotesQuery,
} from '@notes/apollo';

import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';

import { IconCheck, IconMoon, IconSunHigh } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { openModal } from '@mantine/modals';
import { CreateUpdateFolder } from './CreateUpdateFolder';

import { FolderList } from './folder-list/folder-list.component';
import { useReactiveVar } from '@apollo/client';
import { loggedIn, loggedUser } from '../lib/apollo';
import { NoteList } from './folder-list/note-list.component';

export default function AppShell({ children }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [showShared, setShowShared] = useState('my-notes');
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { pathname, replace } = useRouter();

  const loggedInR = useReactiveVar(loggedIn);
  const userR = useReactiveVar(loggedUser);

  const { data, loading } = useGetFoldersQuery();

  const [logout, { client, data: logoutCall }] = useLogoutMutation();
  const [createFolder] = useCreateFolderMutation({
    refetchQueries: ['getFolders'],
  });

  const { data: sharedNotes } = useGetSharedNotesQuery();

  const onLogout = () => {
    logout();
    client.clearStore();

    loggedUser(null);
    loggedIn(null);

    replace('/auth/login');
    logoutCall &&
      showNotification({
        title: 'Success',
        message: "You've successfully signed out",
        color: 'teal',
        icon: <IconCheck size={18} />,
      });
  };

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

            <SegmentedControl
              value={showShared}
              onChange={setShowShared}
              color={'blue'}
              radius={'lg'}
              data={[
                {
                  label: 'My notes',
                  value: 'my-notes',
                },
                {
                  label: 'Shared',
                  value: 'shared',
                },
              ]}
            />

            {loading && (
              <>
                <Skeleton height={15} radius="xl" />
                <Skeleton height={15} mt={10} radius="xl" />
                <Skeleton height={15} mt={10} radius="xl" />
              </>
            )}

            {showShared === 'my-notes' && data?.folders && (
              <FolderList folders={data.folders} />
            )}

            {showShared === 'shared' && sharedNotes && (
              <NoteList notes={sharedNotes?.getNotesForCollaborator} />
            )}
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
                sx={{ userSelect: 'none' }}
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
                  {!loggedInR && (
                    <Menu.Item component={NextLink} href={'/auth/login'}>
                      Login
                    </Menu.Item>
                  )}
                  {loggedInR && (
                    <Menu.Item onClick={onLogout}>Logout</Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
              <ActionIcon
                mx={10}
                variant="subtle"
                color={dark ? 'orange' : 'blue'}
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

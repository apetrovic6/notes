import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  MediaQuery,
  Menu,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconCheck, IconMoon, IconSunHigh } from '@tabler/icons';
import { Header as MantineHeader } from '@mantine/core';
import { useReactiveVar } from '@apollo/client';
import { loggedIn, loggedUser } from '../../lib/apollo';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { useLogoutMutation } from '@notes/apollo';

export const Header = ({ opened, setOpened }) => {
  const { pathname, replace } = useRouter();

  const loggedInR = useReactiveVar(loggedIn);
  const userR = useReactiveVar(loggedUser);

  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const [logout, { client, data: logoutCall }] = useLogoutMutation();

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
    <MantineHeader height={70} p="md">
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
              {loggedInR && <Menu.Item onClick={onLogout}>Logout</Menu.Item>}
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
    </MantineHeader>
  );
};

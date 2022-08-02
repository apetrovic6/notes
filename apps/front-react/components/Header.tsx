import {
  ActionIcon,
  Avatar,
  Burger,
  Header as MHeader,
  Menu,
  Text,
  Box,
} from '@mantine/core';
import { toggleSidebar, useDispatch, useSelector } from '@notes/store';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
export const Header = () => {
  const dispatch = useDispatch();
  const barOpened = useSelector(state => state.ui.sidebarOpen);
  const { pathname } = useRouter();
  return (
    <MHeader
      height={50}
      p={15}
      sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      })}
    >
      <Box
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
        })}
      >
        {pathname.includes('/dashboard') && (
          <Burger
            className={'lg:hidden '}
            opened={null}
            onClick={() => dispatch(toggleSidebar())}
          />
        )}
      </Box>
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
    </MHeader>
  );
};

import {
  ActionIcon,
  Avatar,
  Burger,
  Header as MHeader,
  Menu,
  Text,
} from '@mantine/core';
import { toggleSidebar, useDispatch, useSelector } from '@notes/store';
import { NextLink } from '@mantine/next';
export const Header = () => {
  const dispatch = useDispatch();
  const barOpened = useSelector(state => state.ui.sidebarOpen);

  return (
    <MHeader height={50} p={15} className={'flex items-center justify-between'}>
      <span className={'flex items-center'}>
        <Burger
          className={'lg:hidden '}
          opened={null}
          onClick={() => dispatch(toggleSidebar())}
        />
        <Text
          mx={10}
          variant={'gradient'}
          size={'xl'}
          gradient={{ from: 'yellow', to: 'green', deg: 50 }}
        >
          Notes
        </Text>
      </span>
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

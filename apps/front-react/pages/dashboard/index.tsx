import type { NextPageWithLayout } from '../_app';
import { ReactElement, useState } from 'react';
import { AppShell, Navbar, NavLink } from '@mantine/core';

const Dashboard: NextPageWithLayout = () => {
  return <div>Test Dashboard</div>;
};

Dashboard.getLayout = function GetLayout(page: ReactElement) {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="xs"
      asideOffsetBreakpoint="xs"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavLink label="First parent link" childrenOffset={28}>
            <NavLink label="First child link" />
            <NavLink label="Second child link" />
            <NavLink label="Nested parent link" childrenOffset={28}>
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
              <NavLink label="Third child link" />
            </NavLink>
          </NavLink>

          <NavLink label="Second parent link" childrenOffset={28}>
            <NavLink label="First child link" />
            <NavLink label="Second child link" />
            <NavLink label="Third child link" />
          </NavLink>
        </Navbar>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {page}
    </AppShell>
  );
};

export default Dashboard;

import type { NextPageWithLayout } from '../_app';
import type { ReactElement } from 'react';
import { AppShell } from '@mantine/core';
import { store } from '@notes/store';
import { Navbar } from '../../components/Navbar';
import { Provider } from 'react-redux';

const Dashboard: NextPageWithLayout = () => {
  return <div>Test Dashboard</div>;
};

Dashboard.getLayout = function GetLayout(page: ReactElement) {
  return <Provider store={store}>{page}</Provider>;
};

export default Dashboard;

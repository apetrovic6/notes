import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  AppShell,
  Header,
  MantineProvider,
  Menu,
  Text,
  ActionIcon,
  Avatar,
  Burger,
} from '@mantine/core';

import './styles.css';

import { ReactElement, ReactNode } from 'react';
import { NextLink } from '@mantine/next';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(
    <>
      <Head>
        <title>Welcome to front-react!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <main className="app">
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AppShell
            padding={-1000}
            header={
              <Header
                height={50}
                p={15}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Burger opened={false} onClick={} />
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
              </Header>
            }
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </main>
    </>
  );
}

export default CustomApp;

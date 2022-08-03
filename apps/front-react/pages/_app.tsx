import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, MantineProvider } from '@mantine/core';
import './styles.css';
import AppShell from '../components/AppShell';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@notes/store';
import { NotificationsProvider } from '@mantine/notifications';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';

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
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Welcome to front-react!</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </NotificationsProvider>
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;

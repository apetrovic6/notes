import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import './styles.css';
import AppShell from '../components/AppShell';
import type { ReactElement, ReactNode } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }) {
  // const getLayout = Component.getLayout ?? (page => page);
  const apolloClient = useApollo(pageProps);

  return (
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

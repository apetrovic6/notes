import { useState } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useApollo } from '../lib/apollo';
import AppShell from '../components/AppShell';

import type { AppProps } from 'next/app';
import type { ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Head>
          <title>Welcome to Notes!</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ModalsProvider>
              <NotificationsProvider>
                <AppShell>
                  <Component {...pageProps} />
                </AppShell>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ApolloProvider>
    </>
  );
}

export default CustomApp;

import { GetServerSideProps } from 'next';
import {
  addApolloState,
  initializeApollo,
  loggedIn,
  loggedUser,
} from '../../lib/apollo';
import { MeDocument, useMeQuery } from '@notes/apollo';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: userData } = useMeQuery();

  useEffect(() => {
    loggedIn(userData ? true : false);
    loggedUser({ ...userData?.me } ?? null);
  }, [userData]);

  return <div>Test Dashboard</div>;
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  if (!ctx.req.cookies.Authorization) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: gql(`
  query me {
  me {
    id
    email
  }
}
`),
    context: {
      headers: {
        cookie: ctx.req.headers.cookie,
      },
    },
  });
  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Dashboard;

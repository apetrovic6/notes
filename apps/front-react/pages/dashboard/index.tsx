import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import { addApolloState, initializeApollo } from '../../lib/apollo';

const Dashboard = () => {
  return <div>Test Dashboard</div>;
};
export const getServerSideProps: GetServerSideProps = async ctx => {
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

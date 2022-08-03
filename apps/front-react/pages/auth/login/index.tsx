import AuthForm from '../../../components/auth/form/auth-form.component';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { useLoginMutation } from '@notes/store';

const Login = () => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const { replace } = useRouter();

  const onSubmit = e => {
    const { email, password } = e;
    login({ authArgs: { email, password } });
  };

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }

  if (isSuccess) {
    replace('/dashboard');
  }

  return (
    <div>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;

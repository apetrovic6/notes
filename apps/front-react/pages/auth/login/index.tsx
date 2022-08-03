import AuthForm from '../../../components/auth/form/auth-form.component';
import { LoadingOverlay } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { useLoginMutation } from '@notes/apollo';

const Login = () => {
  const [login, { error, loading, data }] = useLoginMutation();

  const { replace } = useRouter();

  const onSubmit = e => {
    const { email, password } = e;
    login({ variables: { authArgs: { email, password } } });
  };

  if (loading) {
    return <LoadingOverlay visible={loading} overlayBlur={2} />;
  }

  if (error) {
    showNotification({
      title: error.name,
      message: error.message,
      icon: <IconX size={18} />,
      color: 'red',
    });
  }

  if (data) {
    showNotification({
      title: 'Success',
      message: "You're logged in!",
      icon: <IconCheck size={18} />,
      color: 'teal',
    });

    setTimeout(() => replace('/dashboard'), 900);
  }

  return (
    <div>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;

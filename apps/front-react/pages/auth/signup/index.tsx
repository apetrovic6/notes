import AuthForm from '../../../components/auth/form/auth-form.component';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { useSignupMutation } from '@notes/apollo';

const Signup = () => {
  const [signup, { data, error, loading }] = useSignupMutation();

  const { replace } = useRouter();

  const onSubmit = e => {
    const { email, password } = e;
    signup({ variables: { getAuthArgs: { email, password } } }).catch(error =>
      showNotification({
        title: error.name,
        message: error.message,
        color: 'red',
      })
    );
  };

  if (loading) {
    return <LoadingOverlay visible={loading} overlayBlur={2} />;
  }

  if (data) {
    showNotification({
      title: 'Success',
      message: "You've successfully registered!",
      icon: <IconCheck size={18} />,
      color: 'teal',
    });

    replace('/dashboard');
  }

  return (
    <div>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Signup;

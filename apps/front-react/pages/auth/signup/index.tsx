import AuthForm from '../../../components/auth/form/auth-form.component';
import { useSignupMutation } from '@notes/store';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';

const Signup = () => {
  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const { replace } = useRouter();

  const onSubmit = e => {
    const { email, password } = e;
    signup({ getAuthArgs: { email, password } });
  };

  if (isLoading) {
    showNotification({
      title: 'Please wait...',
      message: "We're signing you up...",
      color: 'blue',
      loading: true,
      disallowClose: true,
    });
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }

  if (isSuccess) {
    replace('/dashboard');
  }

  if (isError) {
    showNotification({
      title: error.name,
      message: error.message,
      color: 'red',
    });
  }

  console.log('RERENDER');

  return (
    <div>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Signup;

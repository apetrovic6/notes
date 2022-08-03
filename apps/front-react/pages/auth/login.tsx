import {
  Container,
  Text,
  Center,
  Box,
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { useRouter } from 'next/router';
import { useSignupMutation } from '@notes/store';

const Login = () => {
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const router = useRouter();
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }).trim(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = e => {
    const { email, password } = e;
    signup({ getAuthArgs: { email, password } });
  };

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
  }
  if (isSuccess) {
    router.push('/dashboard');
  }

  return (
    <Container>
      <Center>
        <Box
          my={'auto'}
          mx={'auto'}
          px={50}
          py={50}
          sx={theme => ({
            borderRadius: theme.radius.xl,
            borderColor: theme.colors.gray[5],
            borderWidth: 1,
          })}
        >
          <Text size={'lg'} component={'h1'} align={'center'}>
            Login
          </Text>

          <form onSubmit={form.onSubmit(values => onSubmit(values))}>
            <TextInput
              label="Email"
              radius={'md'}
              placeholder="Your email"
              icon={<IconAt size={14} />}
              mb={15}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              radius={'md'}
              placeholder="Your password"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? (
                  <IconEyeOff size={size} />
                ) : (
                  <IconEyeCheck size={size} />
                )
              }
              mb={15}
              {...form.getInputProps('password')}
            />

            <Button type={'submit'} py={10} radius={'lg'} fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;

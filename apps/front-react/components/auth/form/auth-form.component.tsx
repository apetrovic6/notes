import {
  Container,
  Text,
  Center,
  Box,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Paper,
  Group,
  Checkbox,
  createStyles,
} from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AuthForm = ({ onSubmit }) => {
  const { pathname } = useRouter();

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

  const useStyles = createStyles(theme => ({
    formContainer: {
      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        width: theme.breakpoints.xs / 2,
      },
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        width: theme.breakpoints.sm / 2,
      },

      [`@media (min-width: ${theme.breakpoints.md}px)`]: {
        width: theme.breakpoints.md / 2,
      },
    },
  }));

  const { classes } = useStyles();
  return (
    <Container>
      <Center>
        <Box px={50} py={50}>
          <Text size={'lg'} component={'h1'} align={'center'}>
            {pathname.includes('login') ? 'Login' : 'Signup'}
          </Text>

          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            className={classes.formContainer}
          >
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

              <Group position="apart" mt="lg" my={'xl'}>
                <Checkbox label="Remember me" />
                <Anchor<'a'>
                  onClick={event => event.preventDefault()}
                  href="#"
                  size="sm"
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button type={'submit'} py={10} radius={'lg'} fullWidth>
                {pathname.includes('login') ? 'Login' : 'Signup'}
              </Button>

              <Link
                href={
                  pathname.includes('login') ? '/auth/signup' : '/auth/login'
                }
                passHref
              >
                <Anchor
                  component="a"
                  my={10}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {pathname.includes('login')
                    ? "Don't have an account?"
                    : 'Have an account?'}
                </Anchor>
              </Link>
            </form>
          </Paper>
        </Box>
      </Center>
    </Container>
  );
};

export default AuthForm;

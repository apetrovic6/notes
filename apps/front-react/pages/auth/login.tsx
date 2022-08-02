import {
  Container,
  Text,
  Center,
  Box,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { IconAt, IconEyeCheck, IconEyeOff } from '@tabler/icons';

const Login = () => {
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
    console.log(e);
  };

  return (
    <Container mt={250}>
      <Center>
        <Box my={'auto'} mx={'auto'} sx={{ maxHeight: 300, maxWidth: 300 }}>
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

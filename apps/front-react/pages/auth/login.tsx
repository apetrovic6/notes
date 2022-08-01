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
  return (
    <Container mt={250}>
      <Center>
        <Box my={'auto'} mx={'auto'} sx={{ maxHeight: 300, maxWidth: 300 }}>
          <Text size={'lg'} component={'h1'} align={'center'}>
            Login
          </Text>

          <form>
            <TextInput
              label="Email"
              radius={'md'}
              placeholder="Your email"
              icon={<IconAt size={14} />}
              mb={15}
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
            />

            <Button my={10} radius={'md'} fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;

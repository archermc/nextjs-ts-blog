import { Button, Group, PasswordInput, TextInput, Text, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Lock } from 'tabler-icons-react';

type FormValues = {
  email: string;
  password: string;
  termsOfService: boolean;
};

type SignUpFormProps = {
  initialValues?: FormValues,
  onSubmit: (values: FormValues) => void,
  toSignIn: () => void,
  error?: Error
};

export const SignUpForm = ({ initialValues, onSubmit, toSignIn, error }: SignUpFormProps) => {
  const form = useForm({
    initialValues: {
      email: initialValues?.email || "",
      password: initialValues?.password || "",
      termsOfService: false
    },
    
    validate: {
      // /[^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      password: (value) => (/[a-zA-Z+]/.test(value) ? null :
        "Password must be at least 8 characters and contain at least 1 letter, 1 number, and 1 special character")
    }
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Email"
        {...form.getInputProps("email")}
        icon={<At size={14} />}
      />
      <PasswordInput
        required
        label="Password"
        {...form.getInputProps("password")}
        icon={<Lock size={14} />}
      />
      <Text color="red" size="sm" style={{ display: error ? "inherit" : "hidden" }}>{error?.message}</Text>
      <Group mt="sm" position="apart">
        <Text onClick={() => toSignIn()}>
          <Anchor color="#666">Have an account? Login</Anchor>
        </Text>
        <Button type="submit">Register</Button>
      </Group>
    </form>
  )
}
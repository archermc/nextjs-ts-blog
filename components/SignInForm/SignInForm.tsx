import { Anchor, Button, Group, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Lock } from "tabler-icons-react";
import { emailRegex } from "../../utils/regex";

type FormValues = {
  email: string;
  password: string;
};

type SignInFormProps = {
  initialValues?: FormValues;
  onSubmit: (val: FormValues) => void;
  toSignUp: () => void;
  error?: string;
}

export const SignInForm = (
  { initialValues, onSubmit, toSignUp, error }: SignInFormProps) => {
  const form = useForm({
    initialValues: {
      email: initialValues?.email || "",
      password: initialValues?.password || "",
    },

    validate: {
      email: (value) => (emailRegex.test(value) ? null : 'Invalid email'),
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
      <Text color="red" size="sm" style={{ display: error ? "inherit" : "hidden" }}>{error}</Text>
      <Group mt="md" position="apart">
        <Text onClick={() => toSignUp()}>
          <Anchor color="#666">Need to make an account? Register</Anchor>
        </Text>
        <Button type="submit">Log In</Button>
      </Group>
    </form>
  )
}
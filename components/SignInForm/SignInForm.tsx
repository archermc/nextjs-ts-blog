import { Anchor, Button, Group, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Lock } from "tabler-icons-react";

type FormValues = {
  email: string;
  password: string;
};

type SignInFormProps = {
  initialValues?: FormValues;
  onSubmit: (val: FormValues) => void;
  toSignUp: () => void;
}

export const SignInForm = (
  { initialValues, onSubmit, toSignUp }: SignInFormProps) => {
  const form = useForm({
    initialValues: {
      email: initialValues?.email || "",
      password: initialValues?.password || "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
      <Group mt="md" position="apart">
        <Text onClick={() => toSignUp()}>
          <Anchor color="gray">Need to make an account? Register</Anchor>
        </Text>
        <Button type="submit">Log In</Button>
      </Group>
    </form>
  )
}
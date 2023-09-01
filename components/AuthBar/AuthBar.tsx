import { Button, Group, Modal, Text } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { SignInForm } from "../SignInForm/SignInForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import styles from "./Authbar.module.scss";
import { useSignUp } from "../../services/auth.service";

export const AuthBar = (props: any) => {
  const { data: session, status } = useSession();
  const { mutateAsync: signUp, data, error } = useSignUp();

  const [signInError, setSignInError] = useState("");
  const [opened, setOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(true); // sets default modal state to sign in

  const getTitle = (isSigningIn: boolean) =>
    isSigningIn ? "Sign In" : "Sign Up";

  const [title, setTitle] = useState(getTitle(signingIn));

  useEffect(() => {
    setTitle(getTitle(signingIn));
  }, [signingIn]);

  if (status === "loading") return null;

  const onSignIn = async (val: any) => {
    setSignInError("");

    const response = await signIn<any>("credentials", {
      ...val,
      redirect: false,
    });
    if (response?.error) {
      setSignInError(response.error);
    } else {
      setOpen(false);
    }
  };

  const onSignUp = async (val: any) => {
    const signUpResponse = await signUp(val);

    const response = await signIn<any>("credentials", {
      ...val,
      redirect: false,
    });
    if (response?.error) {
      console.log(response.error);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <Group position="right" {...props} className={styles.container}>
        {session ? (
          <Group>
            <Text mr="md">
              Signed in as <Link href="/profile">{session?.user?.email}</Link>
            </Text>
            <Button onClick={() => signOut()}>Sign out</Button>
          </Group>
        ) : (
          <>
            <Button onClick={() => setOpen(true)}>{title}</Button>
          </>
        )}
      </Group>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpen(false)}
        title={title}
      >
        {signingIn ? (
          <SignInForm
            onSubmit={onSignIn}
            toSignUp={() => setSigningIn(false)}
            error={signInError}
          />
        ) : (
          <SignUpForm
            onSubmit={onSignUp}
            toSignIn={() => setSigningIn(true)}
            error={error as any}
          />
        )}
      </Modal>
    </>
  );
};

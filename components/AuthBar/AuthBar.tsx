import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Group, Modal, Text } from "@mantine/core";

import { SignInForm } from "../SignInForm/SignInForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import { useSignUp } from "../../services/auth.service";

import styles from "./Authbar.module.scss";
import Link from "next/link";

export const AuthBar = (props: any) => {
  const { data: session, status } = useSession();
  const { mutate: signUp } = useSignUp();

  const [opened, setOpen] = useState(false);
  const [signingIn, setSigningIn] = useState(true); // sets default modal state to sign in
  const [title, setTitle] = useState(signingIn ? "Sign In" : "Sign Up");

  useEffect(() => {
    setTitle(signingIn ? "Sign In" : "Sign Up")
  }, [signingIn]);

  if (status === "loading") return null;

  const onSignIn = (val: any) => signIn('credentials', val);
  const onSignUp = (val: any) => signUp(val);

  return (
    <>
      <Group position="right" {...props} className={styles.container}>
        {session ? (
          <Group>
            <Text mr="md">Signed in as <Link href="/profile">{session?.user?.email}</Link></Text>
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
        {signingIn 
          ? <SignInForm onSubmit={onSignIn} toSignUp={() => setSigningIn(false)} />
          : <SignUpForm onSubmit={onSignUp} toSignIn={() => setSigningIn(true)} /> }
      </Modal>
    </>
  )
};
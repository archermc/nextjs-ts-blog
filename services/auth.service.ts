import { useMutation } from "react-query";

type SignInCredentials = {
  email: string; 
  password: string; 
};
type SignUpCredentials = SignInCredentials & {
  termsOfService: boolean;
};

const signUp = async (creds: SignUpCredentials): Promise<any> => {
  const rawResponse = await fetch("/api/auth/signUp", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  });

  const response = await rawResponse.json();

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
}

export const useSignUp = () => useMutation((params: SignUpCredentials) => signUp(params));
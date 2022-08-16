import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { client } from "../../../services/client";
import { GetUserByEmail } from "../../../graphql/queries";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@nextjsblog.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password"
        }
      },
      authorize: async (record) => {
        const email = record?.email;
        const password = record?.password!;

        const response = await client.request(GetUserByEmail, { email });

        if (!response.user) {
          return null;
        }

        const isValid = await compare(password, response.user.password);

        if (!isValid) throw new Error("Wrong credentials. Try again.");

        return {
          id: response.user.id,
          username: email,
          email,
        }
      }
    })
  ]
})
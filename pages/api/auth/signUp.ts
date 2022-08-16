import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";
import { CreateBlogUserByEmail, PublishBlogUser } from "../../../graphql/mutations";
import { client } from "../../../services/client";

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createResponse = await client.request(
      CreateBlogUserByEmail,
      {
        email: req.body.email,
        password: await hash(req.body.password, 12),
      }
    );
  } catch (e: any) {
    // tried signing up with an existing email
    if (e.response.errors && e.response.errors[0].message.includes("value is not unique for the field \"email\"")) {
      res.status(400).json({ error: "An account with that email address already exists" });
      return;
    }
    
    res.status(500).json({ errors: e.response.errors });
    return;
  }
  
  // immediately publishes user on creation; will need to change if verification happens
  const publishResponse = await client.request(PublishBlogUser, req.body);

  if (!publishResponse) {
    res.status(500).send({ errors: `Could not publish profile for user ${req.body.email}`});
    return;
  }
  
  const result = await signIn('credentials', req.body);

  res.status(200).send(result);
  res.end();
}
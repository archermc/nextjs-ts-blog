import { Group, Header, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: session, status } = useSession();
  const Form = useForm({
    initialValues: {
      email: session?.user?.email
    }
  })

  const saveProfileDetails = (details: any) => {
    console.log(details);
  }

  return (
    <Group direction="column" m="md">
      <Header height="sm">Profile Details</Header>
      <form onSubmit={saveProfileDetails}>
        <Group position="apart">
          <TextInput 
            readOnly
            label="Email" 
            />
        </Group>
      </form>
    </Group>
  )
};

export default Profile;
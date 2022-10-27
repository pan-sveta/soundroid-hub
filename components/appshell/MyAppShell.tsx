import {AppShell, Button, Header, Navbar} from "@mantine/core";
import {signIn, useSession} from "next-auth/react";
import User from "./User";
import MyHeader from "./MyHeader";

type Props = {
    children: JSX.Element,
};

const MyAppShell = ({children}: Props) => {
    const {data: session} = useSession();

  return (
      <AppShell
          padding="md"
          header={<MyHeader/>}
          styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
      >
          {children}
      </AppShell>
  );
}

export default MyAppShell
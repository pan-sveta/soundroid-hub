import {Group, Box, Avatar, Text, UnstyledButton, useMantineTheme, Button, Menu} from "@mantine/core";
import {signIn, signOut, useSession} from "next-auth/react";
import {IconChevronLeft, IconChevronRight, IconLogout} from "@tabler/icons";

const User = () => {
    const theme = useMantineTheme();
    const {data: session} = useSession();

    if (!session)
        return <Button onClick={() => signIn()}>Log in</Button>

    return (
        <Box>
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                }}
            >
                <Menu shadow="md" width={200} withArrow offset={10}>
                <Menu.Target>
                    <Group>
                        <Avatar
                            src={session?.user?.image}
                            radius="xl"
                        />
                        <Box sx={{flex: 1}}>
                            <Text size="sm" weight={500}>
                                {session?.user?.name}
                            </Text>
                            <Text color="dimmed" size="xs">
                                {session?.user?.email}
                            </Text>
                        </Box>
                    </Group>
                </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item color={"red"} icon={<IconLogout size={14} />} onClick={() => signOut()}>Logout</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </UnstyledButton>
        </Box>
    );

}

export default User
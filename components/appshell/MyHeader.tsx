import User from "./User";
import {Group, Header, Text, Center, Title} from "@mantine/core";

const MyHeader = () => {
    return (
        <Header height={65} px={"md"}>{
                <Group position={"apart"} align={"center"}>
                    <Title order={1} size={"h3"} weight={700}>Soundroid hub</Title>
                    <User/>
                </Group>
        }</Header>
    );
}

export default MyHeader
import React, {useState} from 'react';
import {Loader, Table, Badge, Group, HoverCard, Stack, Text, Popover, TextInput} from "@mantine/core";
import useSWR from "swr";
import {AllSoundsResponse} from "../pages/api/sounds";
import {fetcher} from "../fetcher";
import {file} from "@babel/types";
import {IconSearch} from "@tabler/icons";

const SoundsBadges = () => {
    const {data, error} = useSWR<AllSoundsResponse>('/api/sounds', fetcher)

    const [searchQuery, setSearchQuery] = useState("");

    if (!data)
        return <Loader/>

    if (error) return <div>{error}</div>

    function getColor(size: number) {
        const colorIndex = size%10;
        switch (colorIndex) {
            case 0:
                return "orange";
            case 1:
                return "indigo";
            case 2:
                return "yellow";
            case 3:
                return "violet";
            case 4:
                return "grape";
            case 5:
                return "lime";
            case 6:
                return "ping";
            case 7:
                return "green";
            case 8:
                return "teal";
            case 9:
                return "blue";
        }
    }

    const rows = data?.sounds.filter((s) => s.name.indexOf(searchQuery) != -1).map((sound) => (
        <Popover key={sound.name} width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Badge size={"md"} color={getColor(sound.size)} key={sound.name}>?{sound.name.substring(0, sound.name.length-4)}</Badge>
            </Popover.Target>
            <Popover.Dropdown>
                <Stack spacing={"xs"}>
                    <Text size="sm">File name: {sound.name}</Text>
                    <Text size="sm">Size: {sound.size}</Text>
                    <Text size="sm">Last modified: {sound.lastModified}</Text>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    ));

    return (
        <Stack>
            <TextInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={"?prdicek"} mb={"md"} icon={<IconSearch/>} />
            <Group>
                {rows}
            </Group>
        </Stack>

    );
};

export default SoundsBadges;

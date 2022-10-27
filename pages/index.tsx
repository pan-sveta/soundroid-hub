import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {signIn, useSession} from "next-auth/react";
import {Button, Container, Grid, Loader, Stack, Table, Title} from '@mantine/core';
import {fetcher} from "../fetcher";
import useSWR from 'swr';
import {AllSoundsResponse} from "./api/sounds";
import SoundsTable from "../components/SoundsTable";
import SoundUploader from "../components/SoundUploader";
import SoundDownloader from "../components/SoundDownloader";
import SoundsBadges from "../components/SoundsBadges";

export default function Home() {


    return (
        <Container size="xl">
            <Stack>
                <Grid>
                    <Grid.Col span={12}>
                        <Stack>
                            <Title order={2}>Sounds</Title>
                            <SoundsBadges/>
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Title order={2}>Add new sound!</Title>
                <Title order={3}>Upload it</Title>
                <SoundUploader/>
                <Title order={3}>Or create directly!</Title>
                <SoundDownloader/>
            </Stack>

        </Container>

    )
}

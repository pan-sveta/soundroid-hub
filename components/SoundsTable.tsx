import React from 'react';
import {Loader, Table} from "@mantine/core";
import useSWR from "swr";
import {AllSoundsResponse} from "../pages/api/sounds";
import {fetcher} from "../fetcher";

const SoundsTable = () => {
    const {data, error} = useSWR<AllSoundsResponse>('/api/sounds', fetcher)

    if (!data)
        return <Loader/>

    if (error) return <div>{error}</div>

    const rows = data?.sounds.map((sound) => (
        <tr key={sound.name}>
            <td>{sound.name}</td>
            <td>{sound.size}</td>
            <td>{new Date(sound.lastModified).toLocaleDateString()}</td>
            <td></td>
        </tr>
    ));

    return (
        <Table striped withBorder >
            <thead>
            <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Last modified</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default SoundsTable;

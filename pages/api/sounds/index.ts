import type {NextApiRequest, NextApiResponse} from 'next'
import {CreateStorageClient, GetAllSounds, Sounds} from "../../../services/StorageService";
import {BucketItem, BucketStream} from "minio";

export type AllSoundsResponse = {
    sounds: Sounds
}

export default async (req: NextApiRequest, res: NextApiResponse<AllSoundsResponse>) => {
    let sounds = await GetAllSounds();

    res.status(200).json({ sounds: sounds })
}
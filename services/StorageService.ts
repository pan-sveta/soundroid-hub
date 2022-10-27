import {BucketItem, BucketStream} from "minio";
import Sounds from "../pages/api/sounds";
import {Client} from "minio"
import * as fs from "fs";
import {File} from "formidable";


export const CreateStorageClient = () => {
    return new Client({
        port: 443,
        useSSL: true,
        endPoint: process.env.MINIO_HOST || "X",
        accessKey: process.env.MINIO_ACCESS_KEY || "X",
        secretKey: process.env.MINIO_PASSWORD || "X"
    });
}

export interface Sound {
    name: string,
    size: number,
    lastModified: Date,
}

export type Sounds = Array<Sound>

export const GetAllSounds = (): Promise<Sounds> => {
    let storageClient = CreateStorageClient();

    return new Promise((resolve, reject) => {
        let stream: BucketStream<BucketItem> = storageClient.listObjects("sounds-bucket");
        let sounds: Sounds = [];

        stream.on("data", (item) => {
            sounds.push({name: item.name, size: item.size, lastModified: item.lastModified});
        })

        stream.on("end", () => {
            resolve(sounds);
        })

        stream.on("error", (err) => reject(err))
    })
}

export const uploadSound = (file: File) => {
    let storageClient = CreateStorageClient();

    console.log(file)

    return storageClient.fPutObject("sounds-bucket", file.originalFilename || "XX", file.filepath);
}
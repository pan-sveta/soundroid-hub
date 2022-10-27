import type {NextApiRequest, NextApiResponse} from 'next'
import {CreateStorageClient, GetAllSounds, Sounds, uploadSound} from "../../../services/StorageService";
import formidable, { File } from 'formidable';

type ProcessedFiles = Array<[string, File]>;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({error: "File upload failed"})
        res.end()
    });

    files?.forEach((file) => uploadSound(file[1]))

    res.status(200)
    res.end()
}

export const config = {
    api: {
        bodyParser: false,
    }
};
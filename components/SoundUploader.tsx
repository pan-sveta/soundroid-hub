import React, {useState} from 'react';
import {Group, Text, useMantineTheme} from '@mantine/core';
import {IconUpload, IconPhoto, IconX, IconDeviceAudioTape} from '@tabler/icons';
import {Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useSWRConfig} from "swr";

function SoundUploader() {
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const {mutate} = useSWRConfig()

    function uploadSound(file: FileWithPath) {

    }

    function uploadSounds(files: FileWithPath[]) {
        setLoading(true);
        var data = new FormData()

        files.forEach((file) => {
            data.append(file.name, file)
        })

        fetch('/api/sounds/upload', {
            method: 'POST',
            body: data
        }).then(() => {
            mutate("/api/sounds").then(() => {
                setLoading(false)
            });
        })
    }

    return (
        <Dropzone
            onDrop={(files) => uploadSounds(files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={100 * 1024 ** 2}
            accept={["audio/mpeg"]}
            loading={loading}
        >
            <Group position="center" spacing="xl" style={{minHeight: 220, pointerEvents: 'none'}}>
                <Dropzone.Accept>
                    <IconUpload
                        size={50}
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size={50}
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconDeviceAudioTape size={50} stroke={1.5}/>
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag and drop new sound effect or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
}

export default SoundUploader;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadFile } from '@/api/services/fileService';
import { AxiosProgressEvent } from 'axios';

interface UploadedFile extends File {
    url?: string;
}

interface FileUploaderProps {
    onFileUpload: (fileUrls: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number[]>([]);
    const [status, setStatus] = useState<string[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files) as UploadedFile[];
            const newProgress = new Array(newFiles.length).fill(0);
            const newStatus = new Array(newFiles.length).fill('Pending');

            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setUploadProgress((prevProgress) => [...prevProgress, ...newProgress]);
            setStatus((prevStatus) => [...prevStatus, ...newStatus]);

            newFiles.forEach((file, index) => {
                uploadFileWithProgress(file, files.length + index);
            });
        }
    };

    const uploadFileWithProgress = async (file: UploadedFile, index: number) => {
        try {
            const url = await uploadFile(file, (progressEvent: AxiosProgressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress((prevProgress) => {
                        const newProgress = [...prevProgress];
                        newProgress[index] = percent;
                        return newProgress;
                    });
                    setStatus((prevStatus) => {
                        const newStatus = [...prevStatus];
                        newStatus[index] = `Uploading: ${percent}%`;
                        return newStatus;
                    });
                }
            });

            setFiles((prevFiles) => {
                const newFiles = [...prevFiles];
                newFiles[index] = { ...newFiles[index], url };
                return newFiles;
            });
            setStatus((prevStatus) => {
                const newStatus = [...prevStatus];
                newStatus[index] = 'File successfully uploaded!';
                return newStatus;
            });
        } catch (error) {
            setStatus((prevStatus) => {
                const newStatus = [...prevStatus];
                newStatus[index] = 'Failed to upload file.';
                return newStatus;
            });
            toast.error(`File upload failed: ${file.name}`);
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                required
            />
            {files.map((file, index) => (
                <div key={index}>
                    <p>{file.name}</p>
                    {file.url && <img src={file.url} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />}
                    <p>{status[index]}</p>
                    {uploadProgress[index] > 0 && <progress value={uploadProgress[index]} max="100" />}
                </div>
            ))}
        </div>
    );
};

export default FileUploader;

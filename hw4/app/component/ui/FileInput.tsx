import React, {ChangeEventHandler} from 'react';

interface FileInputProps {
    label: string;
    onChange:ChangeEventHandler<HTMLInputElement> | undefined;
    file:string;
    status:string;
    progress:number;
    value:string;
}
const FileInput: React.FC<FileInputProps> = ({ label, onChange, file, status, progress }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="file"
            onChange={onChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {file && <img src={file} alt="Preview" style={{ width: "100%", height: "auto" }} />}
        {status && <p>{status}</p>}
        {progress > 0 && <progress value={progress} max="100" />}
    </div>
);
export default FileInput;
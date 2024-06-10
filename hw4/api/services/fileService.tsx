import { AxiosProgressEvent } from 'axios';
import {axiosInstance} from '../apiClient';

export const uploadFile = async (file: File, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/files/upload', formData, {
        onUploadProgress,
    });

    return response.data.location;
};

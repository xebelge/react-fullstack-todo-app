import React from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase-config';

const FileDownloader = ({ filePath }) => {
    const storage = getStorage(app);

    const handleDownload = () => {
        if (!filePath) {
            console.error('No file path specified');
            return;
        }

        const fileRef = ref(storage, filePath);

        getDownloadURL(fileRef)
            .then((url) => {
                window.open(url, '_blank');
            })
            .catch((error) => {
                console.error('Error fetching file URL:', error);
            });
    };

    return <button className='download' onClick={handleDownload}>Download File</button>;
};

export default FileDownloader;

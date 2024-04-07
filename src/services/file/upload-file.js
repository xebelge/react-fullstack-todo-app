import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../firebase-config';

export const uploadFile = async (file, path) => {
    if (!file) return { path: '', url: '' };
    const fileRef = ref(storage, `${path}/${auth.currentUser.uid}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { path: snapshot.ref.fullPath, url };
};
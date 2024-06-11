import { nanoid } from 'nanoid';
import { UploadFunc } from '../share/var';
import getDecorated from './decorate';
import { isPromise } from './tool';

function getUploadPlaceholder(file: File, onImageUpload: UploadFunc) {
  const placeholderText = `Uploading_${nanoid()}`;
  const placeholder = getDecorated(placeholderText, 'image', {
    target: placeholderText,
    imageUrl: '',
  }).text;
  const uploaded = new Promise((resolve: (url: string) => void) => {
    let isCallback = true;
    const handleUploaded = (url: string) => {
      if (isCallback) {
        console.warn('Deprecated: onImageUpload should return a Promise, callback will be removed in future');
      }
      resolve(
        getDecorated(file.name, 'image', {
          target: file.name,
          imageUrl: url,
        }).text,
      );
    };
    // Upload Promise
    const upload = onImageUpload(file, handleUploaded);
    if (isPromise(upload)) {
      isCallback = false;
      upload.then(handleUploaded);
    }
  });
  return { placeholder, uploaded };
}

export default getUploadPlaceholder;

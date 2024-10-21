export const readFileContent = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => resolve(event?.target?.result as string);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export const getUploadedImageResolution = (file: File): Promise<number[]> => new Promise((resolve, reject) => {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.onload = () => {
    URL.revokeObjectURL(objectUrl);
    resolve([img.width, img.height]);
  };
  img.onerror = reject;
  img.src = objectUrl;
});

const calculateUploadedImageNewSize = (
  currentWidth: number,
  currentHeight: number,
  maxWidth: number,
  maxHeight: number,
) => {
  let w = currentWidth;
  let h = currentHeight;
  if (w > h) {
    if (w > maxWidth) {
      h = Math.round((h * maxWidth) / w);
      w = maxWidth;
    }
  } else if (h > maxHeight) {
    w = Math.round((w * maxHeight) / h);
    h = maxHeight;
  }

  return [w, h];
};

export const resizeUploadedImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => new Promise((resolve, reject) => {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  img.onload = () => {
    const [newWidth, newHeight] = calculateUploadedImageNewSize(img.width, img.height, maxWidth, maxHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;

    // draw the image
    ctx?.drawImage(img, 0, 0, newWidth, newHeight);
    const dataUri = canvas.toDataURL(file.type, 0.9);
    URL.revokeObjectURL(objectUrl);
    canvas.remove();
    resolve(dataUri);
  };
  img.onerror = reject;
  img.src = objectUrl;
});

export const dataURItoBlob = (dataURI: string) => {
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  // Separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // Write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

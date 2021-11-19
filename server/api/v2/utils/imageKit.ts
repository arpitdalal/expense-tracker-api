import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUB_KEY ?? '',
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ?? '',
  urlEndpoint: process.env.IMAGE_KIT_ENDURL ?? '',
});

export const getImages = (tags: string) => {
  return new Promise((resolve, reject) => {
    imagekit
      .listFiles({
        tags,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addImage = (
  file: string,
  fileName: string,
  folder: string,
  tags: string
) => {
  return new Promise((resolve, reject) => {
    imagekit
      .upload({
        file,
        fileName,
        folder,
        tags,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteImage = (fileId: string) => {
  return new Promise((resolve, reject) => {
    imagekit
      .deleteFile(fileId)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

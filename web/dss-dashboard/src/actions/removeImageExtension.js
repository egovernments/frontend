import CONFIGS from '../config/configs';
export default function removeImageExtension(image) {
  console.log('image in removeImageExt file = ', image)
  /*for(var i=0;i<CONFIGS.DOC_EXTENSION.length;i++){
      image = image.replace(CONFIGS.DOC_EXTENSION[i],'')
  }*/
  return image;
}
import CONFIGS from '../config/configs';
export default function removeImageExtension(fileArr) {
	let image = '';
	fileArr.map(fileData => {
		for(var i=0;i<CONFIGS.DOC_EXTENSION.length;i++){
		  	if(!fileData.includes(CONFIGS.DOC_EXTENSION[i])) {
			    image = fileData
			   break;
			}
		}
	})
  /*for(var i=0;i<CONFIGS.DOC_EXTENSION.length;i++){
      image = image.replace(CONFIGS.DOC_EXTENSION[i],'')
  }*/
  return image;
}
/**
 * File对象转换为dataURL 同时做压缩处理
 * @param  {File}     blob     图片文件
 * @param  {Function} callback 处理回调
 * @return {Object}   imageData {blob: 文件对象, dataUrl: base64图片文件}
 */
export default function handleCompressImage(blob, callback) {
  const a = new FileReader()

  a.onload = function(e) {
    compressImage(e.target.result, 70, blob.type).then(imageData => {
      callback(imageData)
    })
  }
  a.readAsDataURL(blob)
}

/**
 * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
 * @param {Image} sourceImgObj The source dataURL
 * @param {Integer} quality The output quality of Image Object
 * @param {String} output format. Possible values are jpg and png
 * @return {Promise} doneCallbacks: newImageData The compressed dataURL
 */
function compressImage(sourceImgDataURL, quality, outputFormat) {
  // dataURL转换为Blob对象
  function dataURLtoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = unescape(dataURI.split(',')[1])
    }

    // separate out the mime component
    let mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0]

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  return new Promise(resolve => {
    let mimeType = 'image/jpeg'

    if (typeof outputFormat !== 'undefined') {
      mimeType = outputFormat
    }

    let cvs = document.createElement('canvas')
    let imgObject = new Image()

    imgObject.onload = function() {
      cvs.width = imgObject.naturalWidth
      cvs.height = imgObject.naturalHeight
      cvs.getContext('2d').drawImage(imgObject, 0, 0)
      const newImageData = cvs.toDataURL(mimeType, quality / 100)

      resolve({ blob: dataURLtoBlob(newImageData), dataUrl: newImageData })
    }
    imgObject.src = sourceImgDataURL
  })
}

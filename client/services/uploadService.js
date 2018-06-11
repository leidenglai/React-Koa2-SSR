import uploadFetch from './fetch/upload'

/**
 * 对应后端涉及到产品的 API
 */
class UploadService {
  /**
   * 上传图片
   * @param  {Object} file
   * @return {Promise}
   */
  uploadImage(file) {
    return uploadFetch(file)
  }
}

// 实例化后再导出
export default new UploadService()

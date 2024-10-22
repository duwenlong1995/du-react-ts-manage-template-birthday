// 读取并显示图片
function displayImage(file: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const result = reader.result
      if (typeof result === 'string') {
        resolve(result) // 读取成功，返回 result
      } else {
        reject('FileReader result is not a valid string')
      }
    }
    reader.onerror = (error) => {
      reject(error) // 读取失败时抛出错误
    }

    reader.readAsDataURL(file) // 开始读取文件
  })
}

/**
 * 将file转为base64
 * @param file
 * @returns
 */
const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
/**
 * 解决多个参数请求接口按顺序返回数据的问题
 * @param params 请求所需要传的参数  string[]
 * @param requestApi 请求接口
 * @returns  Promise<[]>
 */
const regularOrderRequest = async (params: string[], requestApi: any) => {
  const result = []
  let index = 0
  for (const item of params) {
    try {
      const res = await requestApi({ filename: item }) // 按顺序等待请求完成
      const blob = new Blob([res])
      const base64 = await getBase64(blob) // 将 Blob 转换为 base64
      result.push({
        name: item,
        uid: `${index + 1}`,
        status: 'done',
        url: base64,
      })
      index++ // 每次循环后递增 index
    } catch (error) {
      console.error('Error during request:', error)
    }
  }
  return result
}
export { displayImage, getBase64, regularOrderRequest }

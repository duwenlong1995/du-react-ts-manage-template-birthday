import { $post } from '@/packages/request'

export const CommonList = (params: any): Promise<any> => {
  return $post('/mock/getData/list', params, {
    // enableCancelModel: false, //针对该接口关闭"取消重复请求模式"
    // retryDelay: 4000, //当前请求重试间隔设置为4秒
    // retryFrequency: 2, //当前请求重试次数（重试频率）2次})
  })
}

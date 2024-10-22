export type FileInfo = {
  name: string
  url: string
  uid: string
  status: string
}

// 使用 interface 定义函数类型
export interface OnUpdateFileNames {
  (val: string[]): void
}
export type sizeInfo = {
  maxWidth: number
  maxHeight: number
}
export interface zipProps {
  quality: number
  size: sizeInfo
  outputFormat: string
  outPutType: string
}
export interface configProps {
  fileType: 'image' | 'file' | 'both'
  maxCount?: number
  beforeUploadConfig: {
    maxSize?: number
    allowedTypes: string[]
  }
  customRequestConfig: {
    requestApi: any
    openZip?: number
    zip?: zipProps
  }
  preview?: boolean
  showFileList?: boolean
}

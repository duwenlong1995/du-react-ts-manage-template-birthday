import React from 'react'
import Resizer from 'react-image-file-resizer'
import { Button } from 'antd'
import { zipProps } from './type'
import { UploadOutlined } from '@ant-design/icons'

/**
 * 压缩图片处理函数
 * @param file
 * @param zip
 * @returns
 */
const handleImageResize = (file: File, zip: zipProps) => {
  const { quality = 60, size, outputFormat = 'jpeg', outPutType = 'file' } = zip
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      size.maxWidth, // 最大宽度
      size.maxHeight, // 最大高度
      outputFormat, // 输出格式
      quality, // 压缩质量
      0, // 图片旋转角度
      (resizedImage) => {
        resolve(resizedImage) // 返回压缩后的图片
      },
      outPutType, // 输出类型，返回文件
    )
  })
}
/**
 * 校验上传的文件是否是支持的格式
 * @param fileType
 * @param file
 * @param allowedTypes
 * @returns
 */
const getFileType = (fileType: string, file: File, allowedTypes: string[]) => {
  if (fileType === 'image') {
    return allowedTypes.includes(file.type)
  }
  if (fileType === 'file') {
    return allowedTypes.includes(file.type)
  }
  return true
}
/**
 * 根据不同的文件类型显示不同的样式
 * @param fileType
 * @param fileList
 * @param maxCount
 * @returns
 */
const changeType = (fileType: any, fileList: any, maxCount: number) => {
  switch (fileType) {
    case 'image':
      return fileList.length < maxCount && '+ Upload'
    case 'file':
      return (
        <Button icon={React.createElement(UploadOutlined)}>
          {fileType === 'image' ? 'Upload Image' : fileType === 'file' ? 'Upload File' : 'Upload'}
        </Button>
      )
    case 'both':
      return (
        <Button icon={React.createElement(UploadOutlined)}>
          {fileType === 'image' ? 'Upload Image' : fileType === 'file' ? 'Upload File' : 'Upload'}
        </Button>
      )
  }
}
function filesPermission(type: any, fileType: any) {
  if (!type.includes(fileType)) {
    return false
  }
  return true
}
const textTip = (type: string) => {
  return type === 'image' ? '图片' : '文件'
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
 * 浏览器下载文件方法
 * @param file File
 * @param name string
 */
const downloadFile = (file: any, name: string) => {
  let downloadElement = document.createElement('a')
  // 创建下载的链接
  let href = window.URL.createObjectURL(file)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = name
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

export { handleImageResize, filesPermission, textTip, getFileType, changeType, getBase64, downloadFile }

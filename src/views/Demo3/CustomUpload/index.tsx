import React, { useState, memo } from 'react'
import { Upload, message, Image } from 'antd'
import { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { handleImageResize, filesPermission, textTip, getFileType, changeType, getBase64, downloadFile } from './utils'
import { OnUpdateFileNames, configProps } from './type'
import { DownloadOutlined } from '@ant-design/icons'
import './index.less'

interface CustomUploadProps extends UploadProps {
  customOnChange?: (fileList: UploadFile[]) => void
  beforeUpload?: (file: File) => boolean | Promise<File>
  defaultValue: UploadFile[]
  onUpdateFileNames: OnUpdateFileNames
  config: configProps
  downFilesApi?: (fileList: UploadFile[]) => void
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  onUpdateFileNames,
  defaultValue = [],
  customOnChange,
  beforeUpload,
  config,
  downFilesApi,
  ...rest
}) => {
  const {
    fileType,
    maxCount = 3,
    beforeUploadConfig = { maxSize: 3, allowedTypes: [] },
    customRequestConfig,
    preview,
    showFileList,
  } = config
  const { maxSize = 3, allowedTypes } = beforeUploadConfig
  const { requestApi, openZip = 0, zip } = customRequestConfig

  const [fileList, setFileList] = useState<UploadFile[]>(defaultValue)
  const [saveImageName, setSaveImageName] = useState<string[]>([])

  const type_message = textTip(fileType)
  // 内置上传方法
  const settingBeforeUpload = (file: File) => {
    if (file.size > 1024 * 1024 * maxSize) {
      message.error(`不能超过文件最大容量${maxSize}MB!`)
      return false
    }

    if (!filesPermission(allowedTypes, file.type)) {
      message.error(`不支持的${type_message}类型！`)
      return false
    }
    return true
  }

  // 内置自定义请求方法
  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options
    if (!file || !(file instanceof File)) {
      // console.error('无效的文件:', file) // 确认文件对象是否有效
      onError(`无效的${type_message}！`)
      return
    }
    try {
      const formData = new FormData()
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB > openZip && zip) {
        const resizedImage = (await handleImageResize(file, zip)) as Blob // 确保类型为 Blob
        formData.append('file', new File([resizedImage], file.name, { type: file.type }))
      } else {
        formData.append('file', file)
      }
      const res = await requestApi(formData)
      if (res.message === 'Success') {
        const newFiles = res.file
        setSaveImageName((prev: string[]) => [...prev, ...newFiles])
        onUpdateFileNames([...saveImageName, ...newFiles])
        onSuccess(`${type_message}上传成功`)
      } else {
        onError(`${type_message}上传失败`)
      }
    } catch (error) {
      onError(`处理${type_message}时出错`)
    }
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    if (customOnChange) {
      customOnChange(newFileList)
    }
  }

  const handleBeforeUpload = (file: File) => {
    return beforeUpload ? beforeUpload(file) : settingBeforeUpload(file)
  }

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  // 弹窗查看图片downloadFile
  const handlePreview = async (file: UploadFile) => {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
    const fileExtension = file.name.split('.').pop() // 获取文件扩展名并转换为小写
    if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      downloadFile(file.originFileObj, file.name)
    } else {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewOpen(true)
    }
  }

  const showUploadList = {
    extra: ({ size = 10 }) => {
      return <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
    },
    showDownloadIcon: true,
    downloadIcon: React.createElement(DownloadOutlined),
    showRemoveIcon: true,
  }

  return (
    <>
      <Upload
        {...rest}
        listType={fileType === 'image' ? 'picture-card' : 'text'}
        fileList={showFileList ? fileList : []}
        onChange={handleChange}
        beforeUpload={(file) => {
          if (!getFileType(fileType, file, allowedTypes)) {
            message.error(`不支持的${type_message}格式!`)
            return Upload.LIST_IGNORE
          }
          return handleBeforeUpload(file)
        }}
        customRequest={customRequestConfig ? handleCustomRequest : undefined}
        onPreview={preview ? handlePreview : undefined}
        showUploadList={fileType === 'file' ? showUploadList : undefined}>
        {changeType(fileType, fileList, maxCount)}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => {
              setPreviewOpen(visible)
              if (!visible) {
                setPreviewImage('') // 关闭时清空预览图片
              }
            },
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

// 设置默认值
CustomUpload.defaultProps = {
  config: {
    fileType: 'image',
    beforeUploadConfig: {
      maxSize: 3,
      allowedTypes: [],
    },
    customRequestConfig: {
      requestApi: (data: any) => {},
      openZip: 1,
      zip: {
        quality: 60,
        size: {
          maxWidth: 800,
          maxHeight: 800,
        },
        outputFormat: 'jpeg',
        outPutType: 'File',
      },
    },
    preview: false,
    showFileList: false,
  },
}

export default memo(CustomUpload)

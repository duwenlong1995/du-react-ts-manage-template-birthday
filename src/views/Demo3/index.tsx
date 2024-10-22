import { useState } from 'react'
import CustomUpload from './CustomUpload'
import { UploadApi, DownLoadApi } from '@/config/api/filesUp'
import { regularOrderRequest } from './utils'
import { UploadFile } from 'antd/es/upload/interface'
import { FileInfo, configProps } from './CustomUpload/type'

const Demo3 = () => {
  // 图片默认值，回显数据
  const [defaultData, setDefaultData] = useState<UploadFile[]>([
    {
      uid: '0',
      name: 'image.png',
      size: 1234567,
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])
  // 下载的图片状态
  const [downLoadImage, setDownLoadImage] = useState<FileInfo[]>([])
  // 删除的图片状态
  const [removeImage, setRemoveImage] = useState<FileInfo[]>([])

  const configImage: configProps = {
    fileType: 'image',
    // maxCount: 3,
    beforeUploadConfig: {
      // maxSize: 10,
      allowedTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    },
    //必传
    customRequestConfig: {
      requestApi: UploadApi,
      openZip: 1,
      zip: {
        quality: 70,
        size: {
          maxWidth: 800,
          maxHeight: 800,
        },
        outputFormat: 'JPEG',
        outPutType: 'file',
      },
    },
    preview: true,
    showFileList: true,
  }

  // 删除图片
  const handleRemove = (options: any) => {
    const { name } = options
    setRemoveImage((prev) => [...prev, name])
  }

  // 下载上传的图片
  const handleFileNamesUpdate = async (options: string[]) => {
    try {
      const result = await regularOrderRequest(options, DownLoadApi) // 调用函数并等待结果
      setDownLoadImage([...result])
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  // ***************************** 上传文件 ****************************************//
  const configFile: configProps = {
    fileType: 'file',
    // maxCount: 3,
    beforeUploadConfig: {
      maxSize: 20,
      allowedTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
        'application/msword', // doc
        'application/zip', // zip,
      ],
    },
    //必传
    customRequestConfig: {
      requestApi: UploadApi,
    },
    preview: true,
    showFileList: true,
  }
  const handleFileNamesUpdateFile = (val: any) => {
    console.log('val::: ', val)
  }
  const handleRemoveFile = (val: any) => {
    console.log('val::: ', val)
  }
  return (
    <>
      <h2>自定义上传图片组件</h2>
      <CustomUpload
        defaultValue={defaultData}
        config={configImage}
        onUpdateFileNames={handleFileNamesUpdate}
        onRemove={handleRemove}
        // customRequest={handleCustomRequest}
        // beforeUpload={beforeUpload}
      />
      <h2>自定义上传文件组件</h2>
      <CustomUpload
        defaultValue={defaultData}
        config={configFile}
        onUpdateFileNames={handleFileNamesUpdateFile}
        onRemove={handleRemoveFile}
        // customRequest={handleCustomRequest}
        // beforeUpload={beforeUpload}
      />
    </>
  )
}

export default Demo3

// 引入mockjs
import Mock from 'mockjs'

//带参数
/* 
post参数，option前端请求的数据，option.url请求的地址
option.type 请求的方式
option.body请求的字符参数（需要JSON.parse转对象）
*/
const list = Mock.mock({
  data: [
    {
      title: '掘金',
      desc: '一个帮助开发者成长的社区',
      url: 'https://juejin.cn/',
      logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/juejin.png',
    },
    {
      title: 'SF思否',
      desc: '思否是中国领先的开发者技术社区',
      url: 'https://segmentfault.com/',
      logo: 'http://coderutil.oss-cn-beijing.aliyuncs.com/bbs-image/file_87feae864e274579824d7398a588e042.png',
    },
    {
      title: 'CSDN',
      desc: '中文最大的技术社区',
      url: 'https://www.csdn.net/',
      logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/csdn.png',
    },
    {
      title: '开源中国',
      desc: '目前国内最大的开源技术社区',
      url: 'https://www.oschina.net/',
      logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/oschina.ico',
    },
    {
      title: 'StackOverflow',
      desc: '全球最大的技术问答社区',
      url: 'https://stackoverflow.com/',
      logo: 'https://qiqihao.oss-cn-beijing.aliyuncs.com/static/coderutil/icon/stackoverflow.svg',
    },
    {
      title: '菜鸟教程',
      desc: '学的不仅是技术，更是梦想',
      url: 'https://www.runoob.com/',
      logo: 'https://static.runoob.com/images/favicon.ico',
    },
  ],
})

Mock.mock('/mock/getData/list', 'post', function (option) {
  console.log('option::: ', option)
  if (option.body === '["gouya"]') {
    const dataList = list.data
    return {
      code: '200',
      msg: 'success',
      data: {
        dataList,
        ...JSON.parse(option.body),
      },
    }
  } else if (option.body === '["goulaoda"]') {
    const dataList = list.data
    return {
      code: '200',
      msg: 'success',
      data: {
        dataList,
        ...JSON.parse(option.body),
      },
    }
  }
})

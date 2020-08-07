import Taro, { Component, Config,onAppShow } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',//首页
      'pages/feedback/index',//意见反馈
      'pages/recorder/index',//记工
      'pages/notepad/index',//记事本
      'pages/addNotepad/index',//新增记事本
      'pages/notepadDetails/index',//记事本详情
      'pages/attendanceSheet/index', // 考勤表
      'pages/download/index', // 下载
      'pages/flowingWater/index',//流水
      'pages/flowingWaterDetails/index',// 流水详情
      'pages/addTeamMember/index', //添加班组成员
      'pages/editDetails/index', //修改记工
      'pages/login/index', //登陆
      'pages/share/index',//分享考勤表
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor:'#0099FF' ,
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      // navigationStyle: 'custom',
    }
  }

  componentDidMount () {}

  componentDidShow () {
    const e = Taro.onAppShow;
    console.log(e,'2131');
  }

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

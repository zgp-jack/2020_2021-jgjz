import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { View, Image  } from '@tarojs/components'
import { bkgetExcelDataAction, bkShareExcelAction } from '../../utils/request/index'
import Msg from '../../utils/msg';
import { IMGCDNURL } from '../../config';
import { REQUESTURL } from '../../config'
import { UserInfo, MidData, Type } from '../../config/store'
import './index.scss'

export default function Download() {
  const [name,setName] = useState<string>('')
  useEffect(()=>{
    let midData = Taro.getStorageSync(MidData);
    const objs = midData.nickname || '未命名';
    setName(objs);
  },[])
  // 查看
  const handleLook = (url)=>{
    // Taro.openDocument({
    //   filePath: `http://miniapitest.zhaogong.vrtbbs.com/bk-bookkeeping/share-excel/`,
    //   fileType: 'xlsx',
    //   success: function (res) {
    //     console.log("打开文档成功")
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log("fail");
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     console.log("complete");
    //     console.log(res)
    //   }
    // })
    let type = Taro.getStorageSync(Type);
    let userInfo = Taro.getStorageSync(UserInfo);
    Taro.downloadFile({
      url: `https://miniapi.zhaogong.vrtbbs.com/bk-bookkeeping/share-excel/?identity=${type}`,
      header: {
        'content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=GBK',
        mid: userInfo.userId,
        token: userInfo.token,
        time: userInfo.tokenTime,
        uuid: userInfo.uuid,
        identity: type
      },
      success: function (res) {
        console.log(res,'resssss')
        Taro.saveFile({
          tempFilePath: res.tempFilePath,
          success: function (res) {
            const savedFilePath:any = res.savedFilePath;
            console.log(savedFilePath,'savedFilePath')
            // Taro.navigateTo({
            //   url: `https://view.officeapps.live.com/op/view.aspx?src=${savedFilePath}`
            // })
            Taro.openDocument({
            filePath: savedFilePath,
            fileType: 'xlsx',
            success: function (res) {
              console.log('打开文档成功')
              Taro.navigateTo({
                url:`/pages/url/index?url=${savedFilePath}`
              })
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
            })
          }
        })
        // var filePath = res.tempFilePath;
        // console.log(filePath);
        // Taro.openDocument({
        //   filePath: filePath,
        //   fileType: 'xlsx',
        //   success: function (res) {
        //     console.log('打开文档成功')
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   },
        //   complete: function (res) {
        //     console.log(res);
        //   }
        // })
      },
      fail: function (res) {
        console.log('文件下载失败');
      },
      complete: function (res) { },
    })
  }
  // 下载
  const handleDownLoad = ()=>{
    let parms = {};
    let userInfo = Taro.getStorageSync(UserInfo);
    let type = Taro.getStorageSync(Type);
    // bkgetExcelDataAction(parms).then(res=>{
    //   if(res.code === 200){
        Taro.downloadFile({
          url: `https://miniapi.zhaogong.vrtbbs.com/bk-bookkeeping/share-excel/?identity=${type}`,
          header: {
            'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=GBK',
            mid: userInfo.userId,
            token: userInfo.token,
            time: userInfo.tokenTime,
            uuid: userInfo.uuid,
            identity:type
          },
          success: function (res) {
            Taro.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (res) {
                console.log('result', res);
                // const savedFilePath: any = res.savedFilePath;
                // console.log(savedFilePath,'savedFilePath')
                // Taro.openDocument({
                //   filePath: savedFilePath,
                //   fileType: 'xlsx',
                //   success: function (val) {
                //     console.log('打开文档成功')
                //     Taro.navigateTo({
                //       url: `/pages/url/index?url=${savedFilePath}`
                //     })
                //   },
                //   fail: function (res) {
                //     console.log(res);
                //   },
                //   complete: function (res) {
                //     console.log(res);
                //   }
                // })
              }
            })
          },
          fail: function (res) {
            console.log('文件下载失败');
          },
          complete: function (res) { },
        })
    //   }else{
    //     Msg(res.msg)
    //   }
    // })
    // Taro.downloadFile()
    
  }
  return (
    <View>
      <View className='content'>
        <View className='img'><Image className='img-img' src={`${IMGCDNURL}excel.png`}/></View>
        <View className='title'>{name}的考勤表.xlsx</View>
      </View>
      <View className='footer'>
        <View className='footer-box'>
        <View className='footer-left' onClick={handleLook}>打开查看</View>
        <View className='footer-right' onClick={handleDownLoad}>下载到微信</View>
        </View>
      </View>
    </View>
  )
}

Download.config = {
  navigationBarTitleText: '下载',
} as Config
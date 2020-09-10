import Taro from '@tarojs/taro'
import { UserInfo } from '../../config/store'
import { UPLOADIMGURL } from '../../config'

// interface ResultImage {
//   errcode: string,
//   errmsg: string,
//   url: string,
//   httpurl: string,
//   card_info?: ResultCardInfoImage,
//   num:number,
// }

// interface ResultCardInfoImage {
//   success: boolean,
//   tips_message: string,
//   address: string,
//   birth: string,
//   gender: number,
//   name: string,
//   nation_id: string,
//   nationality: string,
//   num: string,
//   sex: string
// }

export default function UploadImgAction(url: string = UPLOADIMGURL): Promise<any> {
  let uploadUrl = url || UPLOADIMGURL
  return new Promise((resolve) => {
    Taro.chooseImage({
      count:4,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        AppUploadImg(resolve, res, uploadUrl)
      }
    })
  })
}


export function CameraAndAlbum(url: string = UPLOADIMGURL): Promise<any> {
  return new Promise((resolve) => {
    Taro.showActionSheet({
      itemList: ['拍照', '从相册中选择'],
    })
      .then(res => {
        let index = res.tapIndex
        Taro.chooseImage({
          count: 4,
          sizeType: ['compressed'],
          sourceType: index === 0 ? ['camera'] : ['album'],
          success: function (res) {
            AppUploadImg(resolve, res, url)
          },
        })
      })
  })
}


function AppUploadImg(resolve, res: any, url: string = UPLOADIMGURL) {
  console.log(res,'resaaaa');
  console.log(resolve,'1111')
  const userInfo = Taro.getStorageSync(UserInfo)
  Taro.showLoading({ title: '图片上传中' })
  let i = 0; let length = res.tempFilePaths.length;
  let data:any=[];
  const upload=()=>{
    console.log(i)
    Taro.uploadFile({
      url: url,
      filePath: res.tempFilePaths[i],
      header: {
        userid: userInfo ? userInfo.userId : ''
      },
      name: 'file',
      success(response) {
        let mydata = JSON.parse(response.data);
        // let resData = { local: response, remote: mydata}
        Taro.showToast({
          title: mydata.errmsg,
          icon: "none",
          duration: 2000,
        })
        if (mydata.errcode == "ok") {
          if (res.tempFilePaths.length == 0){
            mydata.num = i;
            resolve(mydata);
          }else{
            let obj ={
              num:i,
              httpurl: mydata.httpurl,
              url: mydata.url,
            }
            data.push(obj);
          }
        }
        console.log(i,'iiiiii')
        i++;
        if (i < length) {
          upload();
        }else{
          resolve(data)
        }
      },
      fail: function () {
        i++;
        if (i < length) {
          upload();
        }
        setTimeout(() => {
          Taro.showToast({
            title: "网络错误，上传失败！",
            icon: "none",
            duration: 4000
          })
        }, 1000)
      },
      complete: function () {
        Taro.hideLoading()
      }
    })
  }
  upload();
  // for (let i = 0; i < res.tempFilePaths.length;i++){
  //   Taro.uploadFile({
  //     url: url,
  //     filePath: res.tempFilePaths[i],
  //     header: {
  //       userid: userInfo ? userInfo.userId : ''
  //     },
  //     name: 'file',
  //     success(response) {
  //       let mydata = JSON.parse(response.data);
  //       // let resData = { local: response, remote: mydata}
  //       Taro.showToast({
  //         title: mydata.errmsg,
  //         icon: "none",
  //         duration: 2000,
  //       })
  //       if (mydata.errcode == "ok") {
  //         mydata.num = i;
  //         resolve(mydata)
  //       }
  //     },
  //     fail: function () {
  //       setTimeout(()=>{
  //         Taro.showToast({
  //           title: "网络错误，上传失败！",
  //           icon: "none",
  //           duration: 4000
  //         })
  //       },1000)
  //     },
  //     complete: function () {
  //       Taro.hideLoading()
  //     }
  //   })
  // }
}

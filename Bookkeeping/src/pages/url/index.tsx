import Taro, { Config, useEffect, useState, useRouter } from '@tarojs/taro'
import { WebView} from '@tarojs/components'

export default function Url() {
  const router: Taro.RouterInfo = useRouter();
  const { url } = router.params;
  return(
    <WebView src={url}></WebView>
  )
}
import Taro, { Config, useContext, useEffect, useState, useRouter, useDidShow } from '@tarojs/taro'
import { View, Text, Picker, ScrollView, Checkbox, Image } from '@tarojs/components'
import { AtIndexes, AtSearchBar } from 'taro-ui'
import userForeman from '../../hooks/foreman';
import { IMGCDNURL, IMAGE } from '../../config';
import AddMember from '../../components/addMember';
import EditMember from '../../components/editMember';
import { useDispatch, useSelector } from '@tarojs/redux';
import { setWorker } from '../../actions/workerList';
import { setmailList } from '../../actions/mailList'
import { bkSetGroupLeaderAction, bkAddWorkerInGroupAction, postDeleteWorkerAction, bkUpdateWorkerAction } from '../../utils/request/index'
import { Type, MidData } from '../../config/store';
import { setPhoneList } from '../../actions/phoneList';
import classnames from 'classnames'
import { isPhone } from '../../utils/v'
import './index.scss'
import Msg from '../../utils/msg';


export default function AddTeamMember() {
  const dispatch = useDispatch()
  // 获取存入的公用内容
  const useSelectorItem = useSelector<any, any>(state => state)
  const router: Taro.RouterInfo = useRouter();
  const { groupInfo, type } = router.params;
  const { handleInput, handleEstablish, addMemberDisplay, setAddMemberDisplay, model, setModel, workerList, setWorkerList, storagelist, setStoragelist } = userForeman()
  // 列表数据
  const [data, setData] = useState<any[]>([]);
  // 默认值
  const [defaultData, setDefaultData] = useState<any[]>([]);
  // 点击数据
  const [clickData, setClickData] = useState<any[]>([]);
  // 输入框
  const [valData, setValData] = useState<string>('');
  // 搜索遮罩层
  const [masklayer, setmasklayer] = useState<Boolean>(false)
  // 全选
  const [selectAll, setSelectAll] = useState<Boolean>(false);
  // 是否全选
  const [isClick,setIsClick]= useState<Boolean>(false); 
  const [administration, setAdministration] = useState<Boolean>(false)
  // 修改
  const [editMemberDisplay, setEditMemberDisplay] = useState<Boolean>(false)
  // 编辑的值
  const [list,setList] = useState({
    name:'',
    phone:'',
    id:'',
  })
  // 关闭添加成员
  const handleAddMemberClose = () => {
    setAddMemberDisplay(false);
    const itme = JSON.parse(JSON.stringify(model));
    setModel({ ...itme, phone: '', userName: '' })
  }
  // const handleCheckbox = (e)=>{
  //   const arr = JSON.parse(JSON.stringify(clickData));
  //   let dataArr = JSON.parse(JSON.stringify(data));
  //   // let arr = JSON.parse(JSON.stringify(storagelist));
  //   // let dataArr = JSON.parse(JSON.stringify(workerList));
  //   if (arr.length === 0 ){
  //     arr.push(e);
  //   }else{
  //     if (arr.indexOf(e.id) === -1) {
  //       arr.push(e)
  //     } else {
  //       arr.splice(arr.indexOf(e.id), 1)
  //     }
  //   }
  //   const list= dataArr.map(v=>{
  //     if(v.id === e.id){
  //       v.click = !v.click;
  //     }
  //     return v;
  //   })
  //   setClickData(arr);
  //   setData(list)
  // }
  useEffect(() => {
    const mid = Taro.getStorageSync(MidData);
    console.log(mid,' mind')
    // 动态设置头部
    let type = Taro.getStorageSync(Type);
    let titel;
    if (type === 1) {
      titel = '添加班组成员'
    } else {
      titel = '添加班组长'
    }
    Taro.setNavigationBarTitle({
      title: titel,
    })
    console.log(useSelectorItem.mailList,'useSelectorItem.mailList');
    console.log(useSelectorItem.phoneList,'useSelectorItem.phoneList')
    if (useSelectorItem.mailList && useSelectorItem.phoneList) {
      const item = JSON.parse(JSON.stringify(useSelectorItem.mailList))
      const arr = JSON.parse(JSON.stringify(useSelectorItem.phoneList))
      let itemData;
      if (item.length > 0) {
        itemData = item.map(v => {
          if (v.list) {
            v.list.map(val => {
              if (arr.length > 0) {
                arr.map(value => {
                  if (val.id == value.id) {
                    if (mid.worker_id == val.id){
                      val.user = true
                    }
                    val.click = true,
                    val.disabled = true
                  }
                  return value;
                })
              }
              return val;
            })
            return v;
          }
        })
      }
      // return;
      console.log(item,'timenejnjfbkja')
      setDefaultData(item);
      setData(item)
    }
  }, [useSelectorItem.mailList, useSelectorItem.phoneList])

  // 字母表
  const letter = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' },
    { id: 4, name: 'D' },
    { id: 5, name: 'E' },
    { id: 6, name: 'F' },
    { id: 8, name: 'G' },
    { id: 9, name: 'H' },
    { id: 10, name: 'I' },
    { id: 11, name: 'J' },
    { id: 12, name: 'K' },
    { id: 13, name: 'L' },
    { id: 14, name: 'M' },
    { id: 15, name: 'N' },
    { id: 16, name: 'O' },
    { id: 17, name: 'P' },
    { id: 18, name: 'Q' },
    { id: 19, name: 'R' },
    { id: 20, name: 'S' },
    { id: 21, name: 'T' },
    { id: 22, name: 'U' },
    { id: 23, name: 'V' },
    { id: 24, name: 'W' },
    { id: 25, name: 'X' },
    { id: 26, name: 'Y' },
    { id: 27, name: 'Z' },
  ]

  const handleClick = () => {

  }
  const onActionClick = () => {
    const value = JSON.parse(JSON.stringify(valData));
    const dataArr = JSON.parse(JSON.stringify(data));
    const defaultDataArr = JSON.parse(JSON.stringify(defaultData));
    let arr: any[] = [
      { list: [] }
    ];
    if (valData == '') {
      arr = defaultDataArr;
    } else {
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].list.length > 0) {
          for (let j = 0; j < dataArr[i].list.length; j++) {
            // 查询电话和手机
            let list: any = [];
            // 首先要判断ID和姓名，然后判断在哪个字母表，然后再追加到数组
            if (dataArr[i].list[j].name.indexOf(value) !== -1 || (dataArr[i].list[j].tel && dataArr[i].list[j].tel.indexOf(value) !== -1)) {
              // for(let z =0;z<arr.length;z++){
              //   for(let b=0;b<arr[z].list;b++){
              //     if (dataArr[i].name === !arr[z].list.name ){
              //       arr.push(dataArr[i]);
              //     }
              //   }
              // }
              list.push(dataArr[i].list[j])
            }
            arr[0].list.push(...list)
          }
        }
      }
    }
    setData(arr);
  }
  const handleOnClear = ()=>{
    setValData('');
    const defaultDataArr = JSON.parse(JSON.stringify(defaultData));
    setData(defaultDataArr);
  }
  const handleChange = (e) => {
    if(e==''){
      const defaultDataArr = JSON.parse(JSON.stringify(defaultData));
      setData(defaultDataArr);
    }
    setValData(e);
  }
  const handleLetter = (v) => {
    const query = Taro.createSelectorQuery()                // 创建节点查询器 query
    query.select(`#${v.name}`).boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
    query.exec((res) => {
      var winWidth = Taro.getSystemInfoSync().windowWidth;
      const data = 750 / winWidth;
      Taro.pageScrollTo({
        scrollTop: (res[0].top) * data,
        duration: 300
      })
    })
  }
  // 跳转
  const userRouteJump = (url: string) => {
    Taro.navigateTo({
      url: url
    })
  }
  const unique = (arr)=> {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
  }
  // 班组长
  const handleForeman = (name, e) => {
    if (type !== '2') {
      if (e.click && e.disabled) return;
      const arr = JSON.parse(JSON.stringify(clickData));
      let dataArr = JSON.parse(JSON.stringify(data));
      if (arr.length === 0) {
        arr.push(e);
      } else {
        if (arr.indexOf(e.id) === -1) {
          arr.push(e)
        } else {
          arr.splice(arr.indexOf(e.id), 1)
        }
      }
      for (let i = 0; i < dataArr.length; i++) {
        dataArr[i].group_leader = dataArr[i].id;
        if (dataArr[i].name_py === name) {
          for (let j = 0; j < dataArr[i].list.length; j++) {
            if (e.id === dataArr[i].list[j].id) {
              dataArr[i].list[j].click = !dataArr[i].list[j].click
            }
          }
        }
      }
      setClickData(arr);
      setData(dataArr)
    } else {
      if(!administration){
        let params = {
          group_info: groupInfo,
          group_leader: e.id
        }
        bkSetGroupLeaderAction(params).then(res => {
        });
        e.group_leader = e.id;
        e.leader_name = e.name;
        dispatch(setWorker([e]))
        Taro.navigateBack({ delta: 1 })
      }else{
        if (e.click && e.disabled) return;
        const arr = JSON.parse(JSON.stringify(clickData));
        let dataArr = JSON.parse(JSON.stringify(data));
        if (arr.length === 0) {
          arr.push(e);
        } else {
          if (arr.indexOf(e.id) === -1) {
            arr.push(e)
          } else {
            arr.splice(arr.indexOf(e.id), 1)
          }
        }
        for (let i = 0; i < dataArr.length; i++) {
          dataArr[i].group_leader = dataArr[i].id;
          if (dataArr[i].name_py === name) {
            for (let j = 0; j < dataArr[i].list.length; j++) {
              if (e.id === dataArr[i].list[j].id) {
                dataArr[i].list[j].click = !dataArr[i].list[j].click
              }
            }
          }
        }
        let clickState = true;
        for (let i = 0; i < dataArr.length; i++) {
          for (let j = 0; j < dataArr[i].list.length; j++) {
            if (!dataArr[i].list[j].disabled) {
              if (!dataArr[i].list[j].click){
                clickState = false
              }
            }
          }
        }
        setIsClick(clickState)
        setClickData(arr);
        setData(dataArr);
      }
    }
  }
  const handleStart = () => {
    const dataArr = JSON.parse(JSON.stringify(data));
    let clickArr: any[] = [];
    clickArr.push(...useSelectorItem.phoneList);
    dataArr.forEach((v, i) => {
      v.list.forEach((val, index) => {
        if (val.click && !val.disabled) {
          clickArr.push(val)
        }
      })
    })
    let arrList = unique(clickArr);
    let ids: string[] = arrList.map(item => item.id);
    if (ids.length < 1) {
      Msg('请选择工人')
      return;
    }
    let params = {
      worker_id: ids,
      group_info: groupInfo,
    }
    bkAddWorkerInGroupAction(params).then(res => {
      if (res.code === 200) {
        dispatch(setPhoneList(arrList));
        dispatch(setWorker(arrList))
        Taro.navigateBack({ delta: 1 })
      }
    })
  }
  // 编辑
  // 全选
  const handleClickCheckout = ()=>{
    console.log(312312)
    const dataItem = JSON.parse(JSON.stringify(data));
    if (isClick){
      for (let i=0; i < dataItem.length; i++) {
        for(let j =0;j<dataItem[i].list.length;j++){
          if (!dataItem[i].list[j].disabled){
            dataItem[i].list[j].click = false
          }
        }
      }
      setIsClick(false)
    }else{
      console.log('aaaaa')
      for(let i=0;i<dataItem.length;i++){
        for (let j = 0; j < dataItem[i].list.length; j++) {
          console.log(dataItem[i].list[j],'1111')
          dataItem[i].list[j].click = true
        }
      }
      setIsClick(true)
    }
    console.log(dataItem,'111')
    setData(dataItem)
  }
  const handleEditMemberClose = ()=>{
    setEditMemberDisplay(false);
  }
  const handleEditEstablish = ()=>{
    const item = JSON.parse(JSON.stringify(list));
    if (!item.name) {
      let type = Taro.getStorageSync(Type);
      if (type == 1) {
        Msg('您还没有填写工人名称')
      } else {
        Msg('您还没有填写班组长名称')
      }
      return
    }
    if (item.phone) {
      if (!isPhone(item.phone)) {
        Msg('请输入正确的手机号')
        return
      }
    }
    let params: any = {
      name: item.name,
      tel: item.phone,
      id: item.id
      // group_info: id,
    }
    console.log(params,'params')
    bkUpdateWorkerAction(params).then(res=>{
      if(res.code == 200){
        setEditMemberDisplay(false);
        const dataItem = JSON.parse(JSON.stringify(data));
        console.log(dataItem,'dataItem111')
        // for(let i =0;i<dataItem.length;i++){
        //   console.log(dataItem[i],'111')
        //   for(let j =0;j<dataItem[i].list;j++){
        //     console.log(dataItem[i].list[j],'jjjj')
        //     if(dataItem[i].list[j].id == item.id){
        //       console.log(1111)
        //       dataItem[i].list[j].name = item.name;
        //       dataItem[i].list[j].tel = item.phone;
        //     }
        //   }
        // }
        // for(let i =0;i<dataItem.length;i++){
        //   console.log(dataItem[i].list,'list');
        //   for(let b=0;b<dataItem[i].list;b++){
        //     console.log(item.id,'11')
        //     if(data[i].list[b].id == item.id){
        //       console.log(1111)
        //       dataItem[i].list[b].name = item.name;
        //       dataItem[i].list[b].tel = item.phone;
        //     }
        //   }
        // }
        const arr =  dataItem.forEach((itemData,index)=>{
          itemData.list.forEach((val,i)=>{
            console.log(val,'cal')
            console.log(item.id)
            if(val.id == item.id){
              val.name = item.name;
              val.tel = item.phone;
            }
          })
        })
        dispatch(setmailList(dataItem))
        setData(dataItem)
      }else{
        Msg(res.msg)
      }
    })
  }
  const handleEdit=(v)=>{
    console.log(v,'user')
    setList(v);
    setEditMemberDisplay(true);
    setList({
      name:v.name,
      phone:v.tel,
      id:v.id,
    })
  }
  const handleEditInput = (type,e)=>{
    console.log(type,'type');
    console.log(e,'eee')
    const item = JSON.parse(JSON.stringify(list));
    item[type] = e.detail.value
    setList({ ...item });
  }
  // 删除工人
  const handelUserDel = ()=>{
    const datas = JSON.parse(JSON.stringify(clickData));
    let ids:string[]=[];
    for(let i =0;i<datas.length;i++){
      ids.push(datas[i].id);
    }
    if (ids.length == 0){
      Msg('请至少选择一条信息')
      return
    }
    Taro.showModal({
      content:'确定要删除吗？',
      showCancel: true,
      confirmColor: 'rgba(0, 153, 255, 1)',
      cancelColor: 'rgba(170, 170, 170, 1)',
      confirmText:'确定删除',
      success:(res)=>{
        if (res.confirm == true) {
          let params={
            ids, 
          }
          postDeleteWorkerAction(params).then(res=>{
            if(res.code === 200){
              Msg('删除成功');
              const dataItem = JSON.parse(JSON.stringify(data));
              // for(let i=0;i<dataItem.length;i++){
              //   for(let j=0;j<dataItem[i].list;j++){
              //     for(let z=0;z<ids.length;z++){
              //       console.log(dataItem[i].list[j].id);
              //       console.log(ids[z])
              //       if(dataItem[i].list[j].id == ids[z]){
              //         console.log(j,'jjjj')
              //         dataItem[i].list.splice(j,1)
              //       }
              //     }
              //   }
              // }
              dataItem.forEach((itemData, index) => {
                itemData.list.forEach((val, i) => {
                  ids.forEach((value,e)=>{
                    if (val.id == value){
                      console.log(1111)
                      console.log(index,'1111')
                      dataItem.splice(index,1);
                    }
                  })
                })
              })
              // return;
              console.log(dataItem,'111')
              setData(dataItem);
              setClickData([])
            }else{
              Msg(res.msg);
            }
          })
        }
      }
    })
  }
  return (
    <View className={addMemberDisplay?'foreman-content':'content'}>
      {masklayer&& <View className='masklayer'></View>}
      <View className='searchName'>
        <AtSearchBar
          placeholder='请输入名字或手机号码查询'
          showActionButton
          value={valData}
          onFocus={() => setmasklayer(true)}
          onClear={handleOnClear}
          onChange={handleChange}
          onActionClick={() => onActionClick()}
          onConfirm={onActionClick}
          onBlur={() => setmasklayer(false)}
        />
      </View>
      <View id='box'>
        {data && data.length > 0 && data.map((val, i) => (
          <View key={i + i}>
            <View className='list-title'>{(val.name_py&&val.name_py.toUpperCase())||''}</View>
            {val.list.map((v => (
              <View className='list-flex-test' onClick={(e) => { e.stopPropagation(),handleForeman(val.name_py, v)}}>
                {(type !== '2' || administration) &&
                  <View>
                    {/* <Checkbox checked={v.click} value={v.click} disabled={v.click && v.disabled} className='Checkbox' onClick={() => handleForeman(val.name_py, v)} /> */}
                    {v.click && v.disabled && 
                    // <View className='checkbox-disabled'></View>
                    <Image src={`${IMGCDNURL}disabledCheckbox.png`} className='checkbox-disabled'/>
                    }
                    {v.click && !v.disabled && 
                    // <View className='checkbox-click'></View>
                    <Image src={`${IMGCDNURL}clickCheckout.png`} className='checkbox-click' />
                    }
                    {!v.click && <View className='checkbox-no'></View>}
                  </View>
                }
                <View>
                  <View className={classnames({
                    'image': v.id % 2 == 1 && v.id > 100,
                    'image-red': v.id % 2 == 0 && v.id > 100,
                    'image-origion': v.id % 2 == 1 && v.id < 100,
                    'image-violet': v.id % 2 == 0 && v.id < 100,
                  })}>{v.name.substring(v.name.length - 2)}</View>
                </View>
                <View>
                  <View className='name'>{v.name}</View>
                  <View className='phone'>{v.tel || ''}</View>
                </View>
                {administration && !v.user ? <View className='edit' onClick={(e) => { e.stopPropagation(),handleEdit(v)}}>编辑</View>:''}
              </View>
            )))}
          </View>
        ))}
      </View>
      {/* <View className='add' onClick={() => setAddMemberDisplay(true)}>添加</View> */}
      <View className={type !== '2' && !administration ? 'user-type' :'user' }>
        <View className='checkoutBox' onClick={handleClickCheckout}>
          {selectAll || (type == '2' && !administration) ? <View className='checkbox-click-all'></View> : (isClick ? <Image src={`${IMGCDNURL}clickCheckout.png`} className='checkbox-click-all' /> : <View className={'checkbox-no-all'}></View>)}{(type == '2' && !administration) ?'':<View>全选</View>}
        </View>
        {administration ? <View className='user-btn-box'><View className='user-btn' onClick={handelUserDel}>删除</View><View onClick={() => setAddMemberDisplay(true)} className='user-btn'>添加</View></View>:''}
        {!administration ? <View className='checkoutBox-name' onClick={() => { setAdministration(true)}}>
          人员管理
          <Image src={`${IMGCDNURL}triangleIcon.png`} className='triangleIcon' />
        </View> : 
          <View className='checkoutBox-close' onClick={() => { setAdministration(false) }}>
            取消
        </View>}
      </View>
      {/* <View className='letter'>
        {letter.map((v=>(
          <View className='letter-list' id={`${v.name}`} onClick={()=>handleLetter(v)} key={v.id}>{v.name}</View>
        )))}
      </View> */}
      {/* footer */}
      {type !== '2' && !administration && <View className='footer'><View className='footer-btn' onClick={handleStart}>开始记工</View></View>}
      {/* 添加成员 */}
      <AddMember display={addMemberDisplay} handleClose={handleAddMemberClose} handleEstablish={handleEstablish} handleInput={handleInput} groupInfo={groupInfo} />
      {/* 修改成员 */}
      <EditMember display={editMemberDisplay} handleClose={handleEditMemberClose} handleEstablish={handleEditEstablish} handleInput={handleEditInput} groupInfo={groupInfo} list={list}/>
    </View>
  )
}
AddTeamMember.config = {
  navigationBarTitleText: '添加班组成员',
} as Config

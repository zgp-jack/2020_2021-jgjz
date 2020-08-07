import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import notepad from './notepad'
import flowingWater from './flowingWater'
import list from './list'
import workerList from './workerList'
import clickTIme from './clickTIme'
import mailList from './mailList'
import type from './type'
import userList from './userList'
import phoneList from './phoneList'
import content from './content'

export default combineReducers({
  counter,
  user,
  notepad,
  flowingWater,
  list,
  workerList,
  clickTIme,
  mailList,
  userList,
  type,
  phoneList,
  content,
})

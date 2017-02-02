import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import conversations from './conversations'
import user from './user'
import auth from './auth'
import people from './people'
import chat from './chat'
import search from './search'
import local_settings from './local_settings'

const rootReducer = combineReducers({
  auth,
  user,
  search,
  local_settings, 
  chat,
  people,
  conversations,
  routing: routerReducer})

export default rootReducer

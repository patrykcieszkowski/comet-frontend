import {createStore, compose, applyMiddleware} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import promise from 'redux-promise-middleware'
import ReduxThunk from 'redux-thunk'

import SocketIO from 'socket.io-client'
import SocketIOMiddleware from 'redux-socket.io-middleware'

import rootReducer from './reducers'
import defaultState from './state_templates'

let ioConnOptions = (defaultState.local_settings.jwtToken) ? {query: 'auth_token='+defaultState.local_settings.jwtToken} : {}
export const io = SocketIO.connect(process.env.SOCKET_URL, ioConnOptions)

const middleware = applyMiddleware(promise(), ReduxThunk, SocketIOMiddleware(io))
const enhancers = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
const store = createStore(rootReducer, defaultState, middleware)
export const history = syncHistoryWithStore(browserHistory, store)

export default store

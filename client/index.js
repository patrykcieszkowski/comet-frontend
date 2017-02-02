import React from 'react'
import {render} from 'react-dom'
import async from 'async'
import _ from 'lodash'

import MediaQuery from 'react-responsive'
import store, {history, io} from './Store'

import css from './styles/style.sass'

import App, {AuthApp} from './components/App'
import Home from './components/Home'
import People from './components/People'
import Search from './components/Search'
import Settings from './components/Settings'
import Chat from './components/Chat'
import User from './components/User'
import Login from './components/Login'
import Signup from './components/Signup'

import {Router, Route, IndexRoute, IndexRedirect, Redirect, browserHistory} from 'react-router'
import {Provider} from 'react-redux'

import {onChatEnter, onUserEnter, onMainAppEnter, onAuthEnter} from './enter_handlers'

function LoginError(data)
{
  store.dispatch({type: 'LOGIN_ERROR'})
}

io.on('connect_error', LoginError)
io.on('disconnect', LoginError)

let prevState = _.cloneDeep(store.getState())
store.subscribe(() =>
{
  let nextState = _.cloneDeep(store.getState())

  // loop for all conversations and check for new messages
  // if there is, and is not sent by the user - notify user
  async.forEachOf(nextState.conversations, (_conv, key, cb) =>
  {
    let _prevConv = prevState.conversations.find((conv) => conv._id === _conv._id)
    if (_prevConv && _prevConv.events)
    {
      let _newMsgList = _conv.events.concat(_prevConv.events)
        .filter((e, n, arr) => {
          return (!arr.find((_e, _n) => (_n !== n && _e._id === e._id)))
        })

      if (_newMsgList.length < 1)
      {
        return cb()
      }

      if (_newMsgList[0].user_id !== nextState.user._id)
      {
        if (nextState.user.settings.sounds)
        {
          // play a sound
          const audio = new Audio(require('./sounds/msg.mp3'))
          audio.play()
        }
      }
    }
    return cb()
  }, () =>
  {
    prevState = nextState
  })
})

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} onEnter={onMainAppEnter}>
        <IndexRoute component={Home} name="home"></IndexRoute>
        <Route path="/people" component={People} name="people"></Route>
        <Route path="/search" component={Search} name="search"></Route>
        <Route path="/settings" component={Settings} name="settings"></Route>
        <Route path="/chat/:chatId" component={Chat} name="Chat" onEnter={onChatEnter}></Route>
        <Route path="/user/:userId" component={User} name="User" onEnter={onUserEnter}></Route>
      </Route>
      <Route path="/auth" component={AuthApp} onEnter={onAuthEnter}>
        <IndexRedirect to="login"></IndexRedirect>
        <Route path="login" component={Login} name="login"></Route>
        // <Route path="signup" component={Signup} name="signup"></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('app'))

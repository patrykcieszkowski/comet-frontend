import { browserHistory } from 'react-router';
import store, { io } from './Store'
import moment from 'moment'

export function onAuthEnter(nextState, replace)
{
  io.disconnect()
}

export function onMainAppEnter(nextState, replace)
{
  let state = store.getState()
  if (state.local_settings.jwtToken)
  {
    if (io.connected)
    {
      io.disconnect()
    }

    io.io.opts.query = 'auth_token='+state.local_settings.jwtToken
    io.connect()
  }
  else
  {
    return replace('/auth/')
  }

  // if (io.connected)
  // {
    store.dispatch({type: 'FETCH_PEOPLE', meta: {remote: true}})
    store.dispatch({type: 'FETCH_USER', meta: {remote: true}})
    store.dispatch({type: 'FETCH_CONVERSATION_LIST', meta: {remote: true}})

  // }

  setInterval(() =>
  {
    state = store.getState()
    for (var i = 0; i < state.conversations.length; i++)
    {
      let conv = state.conversations[i]
      if (conv.events && conv.events.length > 0)
      {
        let recentEvent = conv.events[conv.events.length-1]
        let fromNowDate = moment(recentEvent.createdAt).fromNow(true)
        store.dispatch({type: 'UPDATE_CONVERSATION_DATE', conv_id: conv._id, fromNowDate})
      }
    }
  }, 60000)
}

export function onChatEnter(nextState, replace)
{
  let {chatId} = nextState.params
  store.dispatch({type: 'SET_CONVERSATION', conv_id: chatId, meta: {remote: true}})
}

export function onUserEnter(nextState, replace)
{
  let {userId} = nextState.params
  let state = store.getState()

  store.dispatch({type: 'FETCH_USER_CONVERSATION', user_id: userId, meta: {remote: true}})

  let person = state.people.find((personFound) => personFound._id === userId)
  if (!person)
  {
    store.dispatch({ type: 'FETCH_USER', user_id: userId, meta: {remote: true} })
  }
}

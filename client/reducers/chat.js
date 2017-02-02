import {chat} from '../state_templates'

export default function(state=chat, action)
{
  switch(action.type)
  {
    case 'LOGOUT_FULFILLED':
    {
      return []
    }
    case 'SET_CONVERSATION':
    {
      return {
        ...state,
        id: action.conv_id
      }
    }
    case 'FETCH_USER_RESULT':
    {
      if (!action.myself) return state
      return {
        ...state,
        id: action.data.active_chat
      }
    }
    case 'FETCH_CONVERSATION':
    {
      return {
        ...state,
        id: action.conv_id
      }
    }
    default:
      return state
  }
}

import {user} from '../state_templates'
import jwt_decode from 'jwt-decode'

export default function(state=user, action)
{
  switch (action.type)
  {
    case 'FETCH_USER_RESULT':
    {
      if (!action.myself) return state
      return Object.assign({}, state, action.data)
    }
    case 'LOGOUT_FULFILLED':
    {
      return {}
    }
    case 'SIGN_UP_FULFILLED':
    case 'LOGIN_FULFILLED':
    {
      return Object.assign({}, state, jwt_decode(action.payload.data.token).user)
    }
    case 'UPDATE_SETTINGS_PHONE_NUMBER_COMPLETED':
    {
      return {
        ...state,
        phone: action.data
      }
    }
    case 'UPDATE_SETTINGS_USER_NAME_COMPLETED':
    {
      return {
        ...state,
        first_name: action.first_name,
        last_name: action.last_name
      }
    }
    case 'UPDATE_SETTINGS_BOOLS_COMPLETED':
    {
      let newState = { ...state }
      newState.settings[action.key] = !(state.settings[action.key])
      return newState
    }
    default:
      return state
  }
}

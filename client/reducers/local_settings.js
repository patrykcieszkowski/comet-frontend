import {local_settings} from '../state_templates'

export default function(state=local_settings, action)
{
  switch(action.type)
  {
    case 'LOGOUT_FULFILLED':
    {
      return {
        jwtToken: null,
        fetch_complete: {
          user: false,
          people: false,
          conversations: false
        },
        people: {
          filter_online: false
        }
      }
    }
    case 'SIGN_UP_FULFILLED':
    case 'LOGIN_FULFILLED':
    {
      return {
        ...state,
        jwtToken: action.payload.data.token,
        fetch_complete: {
          ...state.fetch_complete,
          user: true
        }
      }
    }
    case 'PEOPLE_FITER_ONLINE':
    {
      return {
        ...state,
        people: {
          ...state.people,
          filter_online: (action.bool)
        }
      }
    }
    case 'FETCH_USER_RESULT':
    {
      if (!action.myself) return state
      return {
        ...state,
        fetch_complete: {
          ...state.fetch_complete,
          user: true
        }
      }
    }
    case 'FETCH_PEOPLE_COMPLETED':
    {
      return {
        ...state,
        fetch_complete: {
          ...state.fetch_complete,
          people: true
        }
      }
    }
    case 'FETCH_CONVERSATION_LIST_COMPLETED':
    {
      return {
        ...state,
        fetch_complete: {
          ...state.fetch_complete,
          conversations: true
        }
      }
    }
    default:
      return state
  }
}

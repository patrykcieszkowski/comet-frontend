import {people} from '../state_templates'

export default function(state=people, action)
{
  switch (action.type)
  {
    case 'LOGOUT_FULFILLED':
    {
      return []
    }
    case 'PERSON_STATUS_UPDATE':
    {
      let index = state.findIndex((el) => el._id === action.data.user_id)
      if (index == -1) return state

      let user = state[index]
      user.online = action.data.status

      return [
        ...state.slice(0, index),
        user,
        ...state.slice(index+1)
      ]
    }
    case 'FETCH_SEARCH_RESULT':
    case 'FETCH_PEOPLE_RESULT':
    case 'FETCH_USER_RESULT':
    {
      if (action.myself)
      {
        return state
      }

      return [
        ...state,
        action.data
      ]
    }
    default:
      return state
  }
}

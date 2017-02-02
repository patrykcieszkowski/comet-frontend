import {conversations} from '../state_templates'
import _ from 'lodash'

export default function(state=conversations, action)
{
  switch(action.type)
  {
    case 'LOGOUT_FULFILLED':
    {
      return []
    }
    case 'READ_CONVERSATION_MESSAGES_NEW':
    case 'READ_CONVERSATION_MESSAGES':
    {
      let index = state.findIndex((conv) => conv._id === action.conv_id)
      if (index == -1) return state

      let conversation = _.cloneDeep(state[index])
      let events = conversation.events.map((event) =>
      {
        if (event.user_id !== action.user_id
          && !event.seen.find((person) => person.user_id === action.user_id))
        {
          event.seen.push({user_id: action.user_id, date: Date.now()})
        }

        return event
      })

      return [
        ...state.slice(0, index),
        _.cloneDeep(conversation),
        ...state.slice(index+1)
      ]
    }
    case 'UPDATE_CONVERSATION_DATE':
    {
      let index = state.findIndex((conv) => conv._id === action.conv_id)
      if (index == -1) return state

      let conversation = _.cloneDeep(state[index])
      let eventIndex = conversation.events.length-1

      conversation.events = [
        ...conversation.events.slice(0, eventIndex),
        {
          ...conversation.events[eventIndex],
          date: {
            ...conversation.events[eventIndex].date,
            fromNow: action.fromNowDate
          }
        }
      ]

      return [
        ...state.slice(0, index),
        conversation,
        ...state.slice(index+1)
      ]
    }
    case 'SEND_MESSAGE_COMPLETED':
    {
      let index = state.findIndex((el) => el._id === action.data.conv_id)
      console.log(index)
      if (index == -1)
      {
        return [
          ...state,
          {
            _id: action.data.conv_id,
            members: action.members,
            createdAt: action.data.createdAt,
            events: [
              action.data
            ]
          }
        ]
      }

      let conversation = _.cloneDeep(state[index])

      conversation.events = [
        ...conversation.events,
        action.data
      ]

      return [
        ...state.slice(0, index),
        conversation,
        ...state.slice(index+1)
      ]

      break
    }
    case 'FETCH_USER_CONVERSATION_RESULT':
    {
      let index = state.findIndex((el) => el._id === action.data._id)
      if (index == -1)
      {
        return [
          ...state,
          action.data
        ]
      }

      return [
        ...state.slice(0, index),
        action.data,
        ...state.slice(index+1)
      ]
    }
    case 'FETCH_CONVERSATION_LIST_RESULT':
    {
      return [
        ...state,
        action.data
      ]
    }
    default:
      return state
  }
}

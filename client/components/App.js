import {bindActionCreators} from 'redux'
import _ from 'lodash'
import {connect} from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import Main from './Main'
import Auth from './Auth'

function mapStateToProps(state, params)
{
  let chatId = params.params.chatId || state.chat.id
  let personId = params.params.userId
  let person = state.people.find((person) => person._id === personId)
  if (personId === state.user._id)
  {
    person = state.user
  }

  let _convs = _.cloneDeep(state.conversations)
  if (_convs.length > 1)
  {
    _convs = _convs.sort((a, b) => {
      if (a.events.length < 1 || b.events.length < 1) return null
      return (a.events[a.events.length -1].createdAt < b.events[b.events.length -1].createdAt)
    })  
  }

  let _searchPeopleRes = state.search.people.result
  _searchPeopleRes = _searchPeopleRes.map((searchPerson) => {
    return state.people.find((findPerson) => findPerson._id === searchPerson)
  })

  return {
    ...state,
    chat: {
      ...state.chat,
      id: chatId || null,
      conv: state.conversations.find((conv) => conv._id === chatId) || null,
    },
    fetch_complete: Object.values(state.local_settings.fetch_complete).every((el) => el),
    person: {
      id: personId,
      user: person
    },
    search: {
      ...state.search,
      people: {
        ...state.search.people,
        result: _.cloneDeep(_searchPeopleRes)
      }
    },
    conversations: _.cloneDeep(_convs)
  }
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)
export const AuthApp = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default App

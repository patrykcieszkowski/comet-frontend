import {search} from '../state_templates'

export default function(state=search, action)
{
  switch(action.type)
  {
    case 'GET_GEO_FULFILLED':
    {
      if (!action.payload
        || !action.payload.data)
      {
        return
      }

      let geoList = action.payload.data.results
      geoList = geoList.map((loc) =>
      {
        return {name: loc.formatted_address, id: loc.place_id}
      })

      return {
        ...state,
        geoResults: geoList
      }
    }
    case 'FETCH_SEARCH_RESULT':
    {
      return {
        ...state,
        [action.searchType]:
        {
          ...state[action.searchType],
          result: [
            ...state[action.searchType].result,
            action.data._id
          ]
        }
      }
    }
    case 'FETCH_SEARCH':
    {
      return {
        ...state,
        [action.searchType]:
        {
          ...state[action.searchType],
          result: []
        }
      }
    }
    case 'SET_SEARCH_VALUE':
    {
      if (!action.searchType && action.key === 'location')
      {
        return {
          ...state,
          location: action.value
        }
      }

      return {
        ...state,
        [action.searchType]:
        {
          ...state[action.searchType],
          query: {
            ...state[action.searchType].query,
            [action.key]: action.value
          }
        }
      }
    }
    default:
      return state
  }
}

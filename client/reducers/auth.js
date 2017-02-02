import {auth} from '../state_templates'

export default function(state=auth, action)
{
  switch(action.type)
  {
    case 'LOGOUT_FULFILLED':
    {
      return {
        ...state,
        auth_status: 'LOGGED_OUT'
      }
    }
    case 'SIGN_UP_PENDING':
    case 'LOGIN_PENDING':
    {
      return {
        ...state,
        auth_status: 'PENDING'
      }
    }
    case 'SIGN_UP_FULFILLED':
    case 'LOGIN_FULFILLED':
    {
      return {
        ...state,
        auth_status: 'SUCCESS'
      }
    }
    case 'SIGN_UP_ERROR':
    case 'LOGIN_ERROR':
    {
      if (!action.payload
        || !action.payload.response)
      {
        return {
          ...state,
          auth_status: 'LOGGED_OUT'
        }
      }

      let { status, data } = action.payload.response
      let { name } = action.payload

      if (data.error)
      {
        console.log(data.error)
      }

      if (status === 401)
      {
        if (!data.validation)
        {
          return state
        }

        return {
          ...state,
          [name]:
          {
            ...state[name],
            validation: {
              ...state[name].validation,
              [data.validation]: false
            }
          }
        }
      }
      else
      {
        return state
      }
    }
    case 'SIGN_UP_VALIDATE_INPUT':
    {
      let _valid = true

      switch (action.name)
      {
        case 'first_name':
        case 'last_name':
        {
          let re = (/^[\p{Latin}[A-Za-z]{2,}$/)
          _valid = (re.test(action.value))
          break
        }
        case 'email':
        {
          let re = (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
          _valid = (re.test(action.value))
          break
        }
        case 'password':
        {
          let re = (/^[a-zA-Z0-9]{8,}$/)
          _valid = (re.test(action.value))
          break
        }
      }

      return {
        ...state,
        signup:
        {
          ...state.signup,
          validation: {
            ...state.signup.validation,
            [action.name]: _valid
          }
        }
      }
    }
    default:
      return state
  }
}

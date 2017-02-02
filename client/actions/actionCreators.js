import {io} from '../Store'
import axios from 'axios'

export function fetch_user(user_id)
{
  return { type: 'FETCH_USER', user_id, meta: {remote: true} }
}

export function fetch_people()
{
  return { type: 'FETCH_PEOPLE', meta: {remote: true} }
}

export function set_conversation(conv_id)
{
  return { type: 'SET_CONVERSATION', conv_id, meta: {remote: true} }
}

export function fetch_conversation(conv_id)
{
  return { type: 'FETCH_CONVERSATION', conv_id }
}

export function fetch_conversation_list()
{
  return { type: 'FETCH_CONVERSATION_LIST', meta: {remote: true} }
}

export function send_message(conv_id, user_id, content)
{
  return { type: 'SEND_MESSAGE', conv_id, user_id, content, meta: {remote: true} }
}

export function settings_username_update(first_name, last_name)
{
  return { type: 'UPDATE_SETTINGS_USER_NAME', first_name, last_name, meta: {remote: true} }
}

export function settings_phone_number_update(code, number)
{
  return { type: 'UPDATE_SETTINGS_PHONE_NUMBER', code, number, meta: {remote: true} }
}

export function settings_bools_update(key, value)
{
  return { type: 'UPDATE_SETTINGS_BOOLS', key, value, meta: {remote: true} }
}


// auth
export function sign_out(token)
{
  return (dispatch) =>
  {
    axios.post(process.env.REST_URL+'/logout', { auth_token: token })
      .then((response) =>
    {
      localStorage.removeItem('jwt_token')
      io.disconnect()
      dispatch(sign_out_success())
    })
  }
}

export function sign_out_success()
{
  return { type: 'LOGOUT_FULFILLED' }
}

export function sign_in(email, password)
{
  return (dispatch) =>
  {
    dispatch(sign_in_pending())
    axios.post(process.env.REST_URL+'/login', { email, password })
      .then((response) =>
    {
      localStorage.setItem('jwt_token', response.data.token)
      dispatch(sign_in_success(response))
    })
      .catch((err) =>
    {
      dispatch(sign_in_error(err.response))
    })
  }
}

export function sign_in_pending()
{
  return { type: 'LOGIN_PENDING' }
}

export function sign_in_success(response)
{
  return { type: 'LOGIN_FULFILLED', payload: { data: response.data }}
}

export function sign_in_error(response)
{
  return { type: 'LOGIN_ERROR', payload: { response, name: 'login' } }
}

export function sign_up(email, password, first_name, last_name, gender, location)
{
  return (dispatch) =>
  {
    dispatch(sign_up_pending())
    axios.post(process.env.REST_URL+'/signup', { email, password, first_name, last_name, gender, location })
      .then((response) =>
    {
      localStorage.setItem('jwt_token', response.data.token)
      dispatch(sign_up_success(response))
    })
      .catch((err) =>
    {
      dispatch(sign_up_error(err.response))
    })
  }
}

export function sign_up_pending()
{
  return { type: 'SIGN_UP_PENDING' }
}

export function sign_up_success(response)
{
  return { type: 'SIGN_UP_FULFILLED', payload: { data: response.data }}
}

export function sign_up_error(response)
{
  return { type: 'SIGN_UP_ERROR', payload: { response, name: 'signup' } }
}

export function sign_up_validate_input(name, value)
{
  return {type: 'SIGN_UP_VALIDATE_INPUT', name, value}
}

// auth end

export function fetch_search(searchType, name, location, gender, online, page)
{
  return { type: 'FETCH_SEARCH', searchType, name, location, gender, online, page, meta: {remote: true} }
}

export function set_search_value(searchType, key, value)
{
  return { type: 'SET_SEARCH_VALUE', searchType, key, value }
}

export function get_geo(location)
{
  if (!location || typeof location !== 'string')
  {
    return { type: 'GET_GEO' }
  }

  return {
    type: 'GET_GEO',
    payload: axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${location}&sensor=true`)
  }
}

export function people_filter_online(bool)
{
  return { type: 'PEOPLE_FITER_ONLINE', bool }
}

export function read_conversation_messages(conv_id, user_id)
{
  return { type: 'READ_CONVERSATION_MESSAGES', conv_id, user_id, meta: {remote: true} }
}

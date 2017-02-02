let jwtToken = localStorage.getItem('jwt_token')

export const chat = {}
export const conversations = []
export const people = []
export const user = {}
export const auth = {
  signup: {
    validation: {
      password: true,
      email: true,
      first_name: true,
      last_name: true,
    },
  },
  login: {
    validation: {
      email: true,
      password: true,
    },
  },
  auth_status: 'PENDING',
}
export const search = {
  people: {
    query: {
      name: '',
      location: '',
      online: false,
      gender: "0",
      page: 1,
    },
    result: [],
  },
  location: '',
  geoResults: []
}
export const local_settings = {
  jwtToken: jwtToken,
  fetch_complete: {
    user: false,
    people: false,
    conversations: false
  },
  people: {
    filter_online: false
  }
}

const state = {chat, conversations, people, user, auth, search, local_settings}
export default state

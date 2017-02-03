import React from 'react'
import UserHeader from './partials/user/UserHeader'
import UserContent from './partials/user/UserContent'

class User extends React.Component
{
  render()
  {
    return (
      <article className="main">
        {React.cloneElement(<UserHeader/>, this.props)}
        {React.cloneElement(<UserContent/>, this.props)}
      </article>
    )
  }
}

User.defaultProps = {
  displayName: 'user'
}

export default User

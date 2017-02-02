import React from 'react'
import UserIcon from '../assets/UserIcon'
import {Link, IndexLink} from 'react-router'

export default class PeopleListItem extends React.Component
{
  render()
  {
    let user = this.props.user
    return (
      <div className="item" key={user._id}>
        <Link to={'/user/'+user._id }>
          <div style={{justifyContent: 'flex-start'}} className="block double">
            <UserIcon url={user.image_url} status={user.status} border={true} />
            <span className="name">{user.first_name} {user.last_name}</span>
          </div>
          <div className="block double">
            <span className="icon send"></span>
          </div>
        </Link>
      </div>
    )
  }
}

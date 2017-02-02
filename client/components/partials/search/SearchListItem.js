import React from 'react'
import UserIcon from '../assets/UserIcon'
import {Link, IndexLink} from 'react-router'

export default class SearchListItem extends React.Component
{
  render()
  {
    let user = this.props.user
    let status = (user.online) ? 'online' : 'offline'
    return (
      <div className="item">
        <Link to={'/user/'+user._id}>
          <div className="block double">
            <UserIcon border={false} url={user.image_url} />
            <div style={{display: 'flex'}} className="block user_details">
              <span className="name">{user.first_name} {user.last_name}</span>
              <span className={status+' user_status'}>{status}</span>
            </div>
          </div>
          <div className="block actions double">
            <span className="icon send"></span>
          </div>
        </Link>
      </div>
    )
  }
}

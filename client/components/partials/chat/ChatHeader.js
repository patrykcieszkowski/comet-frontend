import React from 'react'
import {Link, IndexLink} from 'react-router'

export default class ChatHeader extends React.Component
{
  renderStatus(status)
  {
    let statusName = (status == 1) ? 'online' : 'offline'
    return (
      <span className={'user_status '+statusName}>{statusName}</span>
    )
  }

  render()
  {
    let user_id = this.props.chat.conv.members.find((user) => user != this.props.user._id )
    let person = this.props.people.find((person) => person._id === user_id)

    return (
      <header className="top">
        <nav className="chat">
          <Link to="/" className="back">
            <span className="icon back"></span>
          </Link>
          <div className="block user_details">
            <div className="block">
              <div className="block user_details">
                <span className="name">{person.first_name} {person.last_name}</span>
                {this.renderStatus(person.online)}
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

import React from 'react'
import UserIcon from '../assets/UserIcon'
import {Link, IndexLink} from 'react-router'

export default class HomeList extends React.Component
{
  renderRecentMessage(list)
  {
    if (!list || list.length < 1) return null
    return (
      <p className="msg">{list[list.length-1].content}</p>
    )
  }

  render()
  {
    let conv = this.props.conversation.conv
    let person = conv.members[0]
    if (!person) return null

    return (
      <div className="item" key={conv._id}>
        <Link to={"/chat/"+conv._id}>
          <div className="block double">
            <UserIcon border={true} status={person.online ? 1 : 0} url={person.image_url} />
            <div className="post_info">
              <span className="name">{person.first_name} {person.last_name}</span>
              {this.renderRecentMessage(conv.events)}
            </div>
          </div>
          <div className="block double">
            <span className="date">{conv.events[conv.events.length-1].date.fromNow}</span>
          </div>
        </Link>
      </div>
    )
  }
}

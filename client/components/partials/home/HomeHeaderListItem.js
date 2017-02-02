import React from 'react'
import {Link, IndexLink} from 'react-router'
import UserIcon from '../assets/UserIcon'

export default class HomHeaderListItem extends React.Component
{
  render()
  {
    let {conversation, user, count} = this.props
    let person = conversation.members.find((_person) => _person !== user._id)
    if (!person) return null

    return (
      <li>
        <Link to={"/chat/"+conversation._id}>
          <UserIcon url={person.image_url} size={60} border={true} bubble={{side: 'left', content: count}}/>
        </Link>
      </li>
    )
  }
}

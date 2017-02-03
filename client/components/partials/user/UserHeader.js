import React from 'react'
import UserIcon from '../assets/UserIcon'
import AutosizeInput from 'react-input-autosize'
import {Link, IndexLink} from 'react-router'

export default class UserHeader extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      conv: this.findConv()
    }
  }

  componentWillReceiveProps()
  {
    this.setState({conv: this.findConv()})
  }

  findConv()
  {
    let {person, conversations, user} = this.props
    let memberList = [person.user._id, user._id].sort()
    let conv = conversations.find((conv) =>
    {
      return (conv.members.length == 2 && conv.members.sort().every((el, n) => (el === memberList[n])))
    })

    return conv
  }

  onBtnClick(e)
  {
    e.preventDefault()
    this.props.set_conversation(this.state.conv._id)
  }

  returnChatBtn()
  {
    if (!this.state.conv)
    {
      return (
        <Link to="/settings" className="sign-out">
          <span className="title">Settings</span>
        </Link>
      )
    }

    return (
      <a href={'/chat/'+this.state.conv._id} className="sign-out" onClick={this.onBtnClick.bind(this)}>
        <span className="title">Send Message</span>
      </a>
    )
  }

  render()
  {
    let {person, conversations} = this.props
    return (
      <header style={{height: '230px'}} className="info">
        <div className="user-settings">
          <UserIcon url={person.user.image_url} border={true} size={90} />
          <div className="block name">
            <span className="name">{person.user.first_name} {person.user.last_name}</span>
          </div>
          {this.returnChatBtn()}
        </div>
      </header>
    )
  }
}

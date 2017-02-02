import React from 'react'
import _ from 'lodash'
import HomeHeader from './partials/home/HomeHeader'
import HomeList from './partials/home/HomeList'
import UserIcon from './partials/assets/UserIcon'

export default class Home extends React.Component
{
  render()
  {
    let {conversations, user, people} = this.props
    let _convs = _.cloneDeep(conversations)
    let _people = _.cloneDeep(people)
    let totalUnread = 0
    _convs = _convs.filter((conv) => conv.events.length > 0)
      .map((conv) =>
    {
      let obj = {}
      obj.conv = conv
      obj.conv.members = obj.conv.members.map((member) => {
          return _people.find((foundPerson) => foundPerson._id === member)
        }).filter((person) => person && person._id !== user._id)

      obj.unreadCount = obj.conv.events.filter((event) => {
          return (
            event.user_id !== this.props.user._id
            && !event.seen.find((member) => member.user_id === user._id))
        }).length || 0

      return obj
    }).filter((conv) => conv.conv.events.length > 0)

    if (_convs.length > 0)
    {
      totalUnread = _convs.map((el) => el.unreadCount).reduce((a, b) => a + b)
    }

    if (_convs.length < 1)
    {
      return (
        <article className="main empty">
          <div className="block error">
            <h1>\ (o_o) /</h1>
            <p>You don't have any messages.</p>            
          </div>
        </article>
      )
    }

    return (
      <article className="main">
        <HomeHeader conversations={_convs} totalUnread={totalUnread} user={this.props.user} />
        <HomeList conversations={_convs} user={this.props.user} />
      </article>
    )
  }
}

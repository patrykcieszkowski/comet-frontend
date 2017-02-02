import React from 'react'
import HomeHeaderList from './HomeHeaderList'

export default class HomeHeader extends React.Component
{
  render()
  {
    let {conversations, user, people, totalUnread} = this.props

    if (!totalUnread || totalUnread.length < 1)
    {
      return null
    }

    return (
      <header style={{height: '230px'}} className="info">
        <HomeHeaderList
          conversations={conversations}
          user={user}
          people={people}
          totalUnread={totalUnread}
        />
        <a href="#" className="hide">
          <span className="icon arrow_up"></span>
        </a>
      </header>
    )
  }
}

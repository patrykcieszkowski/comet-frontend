import React from 'react'
import HomeHeaderListItem from './HomeHeaderListItem'

export default class HomeHeaderList extends React.Component
{
  render()
  {
    let convs = this.props.conversations
      .filter((conv) => conv.unreadCount > 0)
      .filter((conv) => conv.conv.events[conv.conv.events.length-1].user_id !== this.props.user._id)

    return (
      <div className="new">
        <ul className="faces">
          {convs.map((conv) => {
            return (
              <HomeHeaderListItem
                key={conv.conv._id}
                conversation={conv.conv}
                count={conv.unreadCount}
                user={this.props.user}
              />
            )
          })}
        </ul>
        <div className="info">{this.props.totalUnread} new messages</div>
      </div>
    )
  }
}

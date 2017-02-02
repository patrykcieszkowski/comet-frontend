import React from 'react'
import ChatMessage from './ChatMessage'
import ReactTooltip from 'react-tooltip'

export default class ChatListItem extends React.Component
{
  render()
  {
    let classList = "event_single block message " + this.props.side
    return (
      <div className={classList} key={this.props.id}>
        <ChatMessage
          text={this.props.text}
          date={this.props.date}
          id={this.props.id}
        />
      <ReactTooltip place="top" effect="solid" type="dark" id={this.props.id}>{this.props.date}</ReactTooltip>
      </div>
    )
  }
}

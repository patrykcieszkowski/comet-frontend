import React from 'react'
import ReactDom from 'react-dom'
import ChatListItem from './ChatListItem'
import { Scrollbars } from 'react-custom-scrollbars'
import ReactTooltip from 'react-tooltip'

export default class ChatList extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      stickToBottom: true
    }
  }

  componentDidMount()
  {
    this.scrollBottom()
  }

  // componentDidUpdate()
  // {
  //   ReactTooltip.rebuild()
  // }

  scrollBottom()
  {
    let {eventList} = this.refs

    if (this.state.stickToBottom)
    {
      eventList.scrollToBottom()
    }
  }

  onScroll()
  {
    let {eventList} = this.refs
    let {getScrollHeight, getClientHeight, getScrollTop} = eventList
    let isOnBottom = (getScrollTop()+getClientHeight()) == getScrollHeight()
    this.setState({stickToBottom: isOnBottom})
  }

  onUpdate(value)
  {
    this.scrollBottom()
  }

  render()
  {
    return (
      <div className="conversation content">
        <Scrollbars
          className="events"
          ref="eventList"
          onUpdate={this.onUpdate.bind(this)}
          onScroll={this.onScroll.bind(this)}
        >

          { this.props.events.map((event) => {
            if (event.type != 0) return
            let msgSide = (event.user_id === this.props.user._id) ? 'right' : 'left'
            return (
              <ChatListItem
                side={msgSide}
                text={event.content}
                key={event._id}
                id={event._id}
                date={event.date.weekDayHour}
              />
            )
          }) }
        </Scrollbars>
      </div>
    )
  }
}

import React from 'react'

export default class UserIcon extends React.Component
{
  renderStatus()
  {
    if (!this.props.status) return
    let statusClass = 'status '
    statusClass += (this.props.status == 1) ? 'online' : 'offline'
    return (
      <div className={statusClass}></div>
    )
  }

  renderBubble()
  {
    if (!this.props.bubble) return
    let bubbleClass = 'bubble ' + this.props.bubble.side
    return (
      <div className={bubbleClass}>{this.props.bubble.content}</div>
    )
  }

  render()
  {
    let sizeStyle = {}
    let image = this.props.url || require('../../../img/noavatar.png')
    if (this.props.size && !isNaN(this.props.size))
    {
      sizeStyle = {
        height: `${this.props.size}px`,
        width: `${this.props.size}px`
      }
    }

    return (
      <div style={sizeStyle} className={'user '+ (this.props.border) ? 'border' : ''}>
        <img src={image} style={sizeStyle} className="avatar" />
        {this.renderStatus()}
        {this.renderBubble()}
      </div>
    )
  }
}

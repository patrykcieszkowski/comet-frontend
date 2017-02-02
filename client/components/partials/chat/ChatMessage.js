import React from 'react'
import ReactTooltip from 'react-tooltip'

export default class ChagMessage extends React.Component
{
  componentDidUpdate()
  {
    setTimeout(() => { ReactTooltip.rebuild() }, 100)
  }

  render()
  {
    return (
      <div data-tip data-for={this.props.id} className="text">{this.props.text}</div>
    )
  }
}

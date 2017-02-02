import React from 'react'

export default class ChatFooter extends React.Component
{
  render()
  {
    return (
      <footer>
        <form className="block" onSubmit={this.props.onMessageSubmitCallback}>
          <input
            type="text"
            ref="message_input"
            name="message_input"
            placeholder="Type your message..."
            className="message_input"
          />
          <input type="submit" hidden />
        </form>
      </footer>
    )
  }
}

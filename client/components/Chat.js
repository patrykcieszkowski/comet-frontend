import React from 'react'
import ChatHeader from './partials/chat/ChatHeader'
import ChatFooter from './partials/chat/ChatFooter'
import ChatList from './partials/chat/ChatList'

class Chat extends React.Component
{
  componentWillMount()
  {
    this.readNewMessages()
  }

  componentWillReceiveProps(nextProps, nextState)
  {
    if (nextProps.chat.id !== this.props.chat.id)
    {
      this.props.fetch_conversation(nextProps.chat.id)
    }
  }

  componentDidUpdate(prevProps)
  {
    this.readNewMessages()
  }

  readNewMessages()
  {
    let chatObj = this.props.chat
    if (!chatObj.conv || !chatObj.id)
    {
      return
    }

    let newMsgs = chatObj.conv.events.filter((event) =>
    {
      return (
          !event.seen.find((person) => person.user_id === this.props.user._id)
        && event.user_id !== this.props.user._id
      )
    })

    if (newMsgs.length > 0)
    {
      this.props.read_conversation_messages(chatObj.id, this.props.user._id)
    }
  }

  onMessageSubmit(e)
  {
    e.preventDefault()
    let input = this.refs.footer.refs.message_input
    this.props.send_message(this.props.chat.id, this.props.user._id, input.value)
    input.value = ""
  }

  renderChatContent()
  {
    return (
      <article className="main chat">
        <header style={{height: "60px", background: "#fff"}} className="info"></header>
        <ChatList events={this.props.chat.conv.events} user={this.props.user} />
      </article>
    )
  }

  render()
  {
    if (!this.props.chat.conv)
    {
      return (
        <div className="content-wrapper">
          <article className="main chat">
            <section className="text-block">
              <h2>No conversation chosen!</h2>
            </section>
          </article>
        </div>
      )
    }

    return (
      <div className="content-wrapper">
        <ChatHeader chat={this.props.chat} people={this.props.people} user={this.props.user} />
        {this.renderChatContent()}
        <ChatFooter ref="footer" onMessageSubmitCallback={this.onMessageSubmit.bind(this)}/>
      </div>
    )
  }
}

Chat.defaultProps = {
  displayName: 'chat'
}

export default Chat

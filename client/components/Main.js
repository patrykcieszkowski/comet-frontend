import Diff from 'deep-diff'
import React from 'react'
import {Link, IndexLink, Redirect} from 'react-router'
import MediaQuery from 'react-responsive'
import Header from './partials/Header'
import Chat from './Chat'
import Home from './Home'

export default class Main extends React.Component
{
  componentWillReceiveProps(nextProps)
  {
    if (nextProps.auth.auth_status === 'LOGGED_OUT')
    {
      return this.context.router.push('/auth')
    }

    let newConvs = nextProps.conversations.filter((conv, n) => {
      let index = this.props.conversations.findIndex((foundConv) => foundConv._id === conv._id)
      return index == -1
    })

    if (this.props.fetch_complete && newConvs.length > 0)
    {
      for (let i = 0; i < newConvs.length; i++)
      {
        let conv = newConvs[i]
        let members = conv.members.filter((member) =>
        {
          let index = nextProps.people.findIndex((person) => (person._id === member))
          return index == -1
        })

        for (let x = 0; x < members.length; x++)
        {
          this.props.fetch_user(members[x])
        }
      }
    }
  }

  renderMain(sidebarBool)
  {
    let sideClass = (sidebarBool) ? 'sidebar' : ''
    let chatHeaderBool = true
    let component = this.props.children

    if (this.props.chat.id)
    {
      // replace chat view with Home view
      // and prevent header from being displayed
      if (this.props.children.type.name === "Chat")
      {
        if (sidebarBool)
        {
          component = <Home />
        }
        else
        {
          chatHeaderBool = false
        }
      }
    }

    return (
      <div className={sideClass}>
        {this.renderHeader(chatHeaderBool, sidebarBool)}
        {React.cloneElement(component, this.props)}
      </div>
    )
  }

  renderHeader(chatHeaderBool, sidebarBool)
  {
    if (!chatHeaderBool || (!chatHeaderBool && this.props.params.chatId)) return null

    return (
      <Header />
    )
  }

  render()
  {
    if (!this.props.fetch_complete)
    {
      return (
        <article className="loading-screen">
          <div className="loader">
            <div className="one"></div>
            <div className="two"></div>
          </div>
        </article>
      )
    }

    return (
      <div className="content-wrapper">
        <MediaQuery query='(max-width: 400px)' className="mobile">
          {this.renderMain(false)}
        </MediaQuery>
        <MediaQuery query='(min-width: 401px)' className="desktop">
          {this.renderMain(true)}
          {React.cloneElement(<Chat />, this.props)}
        </MediaQuery>
      </div>
    )
  }
}

Main.contextTypes = {
  router: React.PropTypes.object
}

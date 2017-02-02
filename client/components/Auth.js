import React from 'react'
import {Link, IndexLink, Redirect} from 'react-router'

export default class Auth extends React.Component
{
  componentWillReceiveProps(nextProps)
  {
    if (nextProps.auth.auth_status === 'SUCCESS')
    {
      this.context.router.push('/')
    }
  }

  render()
  {
    return (
      <div className="content-wrapper auth">
        <article className="auth-form">
          <div className="logo"></div>
          {React.cloneElement(this.props.children, this.props)}
        </article>
      </div>
    )
  }
}

Auth.contextTypes = {
  router: React.PropTypes.object
}

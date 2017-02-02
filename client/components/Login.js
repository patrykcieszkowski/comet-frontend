import React from 'react'
import {Link, IndexLink} from 'react-router'
import ReactTooltip from 'react-tooltip'
import {io} from '../Store'

export default class Login extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      password: null,
      email: null,
    }
  }

  searchFormSubmit(e)
  {
    e.preventDefault()
    this.props.sign_in(this.state.email, this.state.password)
  }

  onChange(e)
  {
    let value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    let obj = {}
    obj[e.target.name] = value
    this.setState(obj)
  }

  inputBorder(name)
  {
    let { validation } = this.props.auth.login
    let _style = {}
    if (name && !validation[name])
    {
      _style = {borderColor: 'red'}
    }

    return (
      <div className="fake-border" style={_style}></div>
    )
  }

  render()
  {
    return (
      <form className="search" onSubmit={this.searchFormSubmit.bind(this)}>
        <div style={{flexDirection: 'column'}} className="block spacer">
          <div className="input">
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              onChange={this.onChange.bind(this)}
            />
            {this.inputBorder('email')}
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.onChange.bind(this)}
            />
            {this.inputBorder('password')}
          </div>
        </div>

        <button type="submit" className="submit">Login</button>
        <Link to="/auth/signup" className="link">SIGN UP</Link>
      </form>
    )
  }
}

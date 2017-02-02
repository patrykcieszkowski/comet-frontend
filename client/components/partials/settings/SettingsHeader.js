import React from 'react'
import UserIcon from '../assets/UserIcon'
import AutosizeInput from 'react-input-autosize'

export default class SettingsHeader extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      nameEdit: false,
      first_name_focus: false,
      last_name_focus: false,
    }
  }

  nameClick()
  {
    this.setState({
      nameEdit: !this.state.nameEdit,
      first_name_focus: !this.state.first_name_focus
    })
  }

  nameUpdate(e)
  {
    e.preventDefault()
    this.setState({nameEdit: !this.state.nameEdit})
    let first_name = this.refs.first_name.value
    let last_name = this.refs.last_name.value
    this.props.settings_username_update(first_name, last_name)
  }

  nameKeyPressed(e)
  {
    if (e.keyCode == 27)
    {
      this.setState({nameEdit: false})
    }
  }

  inputFocusUpdate(e)
  {
    this.updateFocus(e.target)
  }

  updateFocus(element, handler)
  {
    let stateObj = {}
    stateObj[element.name+'_focus'] = (element === document.activeElement)
    this.setState(stateObj, handler)
  }

  inputBlurUpdate(e)
  {
    this.updateFocus(e.target, () =>
    {
      setTimeout(() =>
      {
        if (!this.state.first_name_focus && !this.state.last_name_focus)
        {
          this.setState({nameEdit: !this.state.nameEdit})
        }
      }, 50)
    })
  }

  renderNameBox()
  {
    let user = this.props.user
    if (this.state.nameEdit)
    {
      return (
        <form
          className="block name"
          ref="nameUpdate"
          onSubmit={this.nameUpdate.bind(this)}>

          <input
            type="text"
            ref="first_name"
            name="first_name"
            defaultValue={user.first_name}
            placeholder="first name"
            tabIndex="0"
            onKeyDown={this.nameKeyPressed.bind(this)}
            onFocus={this.inputFocusUpdate.bind(this)}
            onBlur={this.inputBlurUpdate.bind(this)}
            autoFocus={true}
          />

          <input
            type="text"
            ref="last_name"
            name="last_name"
            defaultValue={user.last_name}
            placeholder="last name"
            onKeyDown={this.nameKeyPressed.bind(this)}
            onFocus={this.inputFocusUpdate.bind(this)}
            onBlur={this.inputBlurUpdate.bind(this)}
          />
          <input type="submit" hidden />
        </form>
      )
    }

    return (
      <div className="block name" tabIndex="0" onFocus={this.nameClick.bind(this)}>
        <span className="name">{user.first_name} {user.last_name}</span>
        <span style={{marginLeft: '10px'}} className="icon edit"></span>
      </div>
    )
  }

  onSignOutClick(e)
  {
    e.preventDefault()
    this.props.sign_out(this.props.local_settings.jwtToken)
  }

  render()
  {
    let user = this.props.user

    return (
      <header style={{height: '230px'}} className="info">
        <div className="user-settings">
          <UserIcon url={user.image_url} border={true} size={90} />
          {this.renderNameBox()}
          <a href="#" className="sign-out" onClick={this.onSignOutClick.bind(this)}>
            <span style={{margin: '0 5px', marginLeft: 0}} className="icon sign-out"></span>
            <span className="title">Sign Out</span>
          </a>
        </div>
      </header>
    )
  }
}

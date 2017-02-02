import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import CheckboxToggler from '../assets/CheckboxToggler'

export default class SettingsContent extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      editPhone: false
    }
  }

  updateBool(e)
  {
    this.props.settings_bools_update(e.target.name, e.target.checked)
  }

  onPhoneEditSubmit(e)
  {
    e.preventDefault()
    let phone_code = this.refs.phone_code.value.toString()
    let phone_number = this.refs.phone_number.value.toString()

    this.props.settings_phone_number_update(phone_code, phone_number)
    this.setState({editPhone: false})
  }

  nameKeyPressed(e)
  {
    if (e.keyCode == 27)
    {
      this.setState({editPhone: false})
    }
  }

  onEditClick(e)
  {
    e.preventDefault()
    this.setState({editPhone: true})
  }

  renderPhoneEdit()
  {
    let {user} = this.props
    if (this.state.editPhone)
    {
      return (
        <div className="number block">
          <form className="block phone_inputs" tabIndex="0" onSubmit={this.onPhoneEditSubmit.bind(this)}>
            <input
              type="number"
              ref="phone_code"
              name="phone_code"
              min="1"
              pattern="\d*"
              defaultValue={user.phone.code || 0}
              onKeyDown={this.nameKeyPressed.bind(this)}
            />
            <input
              type="number"
              ref="phone_number"
              name="phone_number"
              min="1"
              pattern="\d*"
              defaultValue={user.phone.number || null}
              onKeyDown={this.nameKeyPressed.bind(this)}
            />
            <input type="submit" hidden />
          </form>
          <div className="block actions center">
            <a href="#" onClick={this.onPhoneEditSubmit.bind(this)}>
              <span className="icon accept black"></span>
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="number block">
        <div className="block">
          <span>{user.phone.full || 'no number provided'}</span>
        </div>
        <div className="block actions">
          <a href="#" onClick={this.onEditClick.bind(this)}>
            <span className="icon edit black"></span>
          </a>
        </div>
      </div>
    )
  }

  render()
  {
    let {user} = this.props
    return (
      <Scrollbars
        ref="setting-details"
        renderView={props => <div {...props} className="setting-details"/>}
      >
        <div className="block phone">
          <span style={{margin: '0 15px', flexShrink: '0'}} className="icon phone"></span>
          {this.renderPhoneEdit()}
        </div>
        <div className="block list">
          <ul>
            <li>
              <CheckboxToggler
                checked={user.settings.sounds}
                onChangeCallback={this.updateBool.bind(this)}
                title="Sounds"
                name="sounds"
              />
            </li>
            <li>
              <CheckboxToggler
                checked={user.settings.show_status}
                onChangeCallback={this.updateBool.bind(this)}
                title="Show my status"
                name="show_status"
              />
            </li>

            <li>
              <CheckboxToggler
                checked={user.settings.show_emoticons}
                onChangeCallback={this.updateBool.bind(this)}
                title="Show emoticons"
                name="show_emoticons"
              />
            </li>
          </ul>
        </div>
    </Scrollbars>
    )

    // mobile setting
    // <li>
    //   <CheckboxToggler
    //     checked={user.settings.notifications}
    //     onChangeCallback={this.updateBool.bind(this)}
    //     title="Notifications"
    //     name="notifications"
    //   />
    // </li>
  }
}

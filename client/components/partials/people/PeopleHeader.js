import React from 'react'
import UserIcon from '../assets/UserIcon'
import RadioToggler from '../assets/RadioToggler'
import CheckboxToggler from '../assets/CheckboxToggler'

export default class PeopleHeader extends React.Component
{
  updateStatusBool(e)
  {
    this.props.settings_bools_update(e.target.name, e.target.checked)
  }

  updateStatusRadio(e)
  {
    let val = Boolean(Number(e.target.value))
    this.props.people_filter_online(val)
  }

  render()
  {
    return (
      <header style={{height: '230px', background: '#fff'}} className="info">
        <div className="user-status">
          <UserIcon url={this.props.user.image_url} border={true} size={90} />

          <CheckboxToggler
            defaultChecked={this.props.user.settings.show_status}
            onChangeCallback={this.updateStatusBool.bind(this)}
            title="My status"
            name="show_status"
            wrapperClass="set_status"
          />

          <RadioToggler
            itemList={[
              { name: 'active_switch', value: '0', checked: true, title: 'All'},
              { name: 'active_switch', value: '1', checked: false, title: 'Active Only'},
            ]}
            onChangeCallback={this.updateStatusRadio.bind(this)}
          />
        </div>
      </header>
    )
  }
}

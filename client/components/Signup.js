import React from 'react'
import ReactTooltip from 'react-tooltip'
import {Link, IndexLink} from 'react-router'
import Autocomplete from 'react-autocomplete'
import RadioToggler from './partials/assets/RadioToggler'

export default class Signup extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      geoTimeout: null,
      password: null,
      email: null,
      first_name: null,
      last_name: null,
      gender: "0"
    }
  }

  signUpFormSubmit(e)
  {
    e.preventDefault()

    let {location} = this.props.search
    let {email, password, first_name, last_name, gender} = this.state

    this.props.sign_up(email, password, first_name, last_name, gender, location)
  }

  onChange(e)
  {
    let value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    let obj = {}
    obj[e.target.name] = value
    this.setState(obj)
  }

  onLocationChange(e)
  {
    this.props.set_search_value(null, e.target.name, e.target.value)
    clearTimeout(this.state.geoTimeout)
    let self = this
    let timeout = setTimeout(() => {
      self.props.get_geo(self.props.search.location)
    }, 500)
    this.setState({ geoTimeout: timeout })
  }

  onInputFocusOut(e)
  {
    let { name, value } = e.target
    this.props.sign_up_validate_input(name, value)
  }

  inputBorder(name)
  {
    let { validation } = this.props.auth.signup
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
    let { location, geoResults } = this.props.search

    return (
      <form className="search" onSubmit={this.signUpFormSubmit.bind(this)}>
        <div style={{flexDirection: 'column'}} className="block spacer">
          <div className="input" data-tip="letters only">
            <input
              data-tip
              data-for="test"
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={this.onChange.bind(this)}
              onBlur={this.onInputFocusOut.bind(this)}
            />
            {this.inputBorder('first_name')}
          </div>
          <div className="input" data-tip="letters only">
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={this.onChange.bind(this)}
              onBlur={this.onInputFocusOut.bind(this)}
            />
            {this.inputBorder('last_name')}
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              onChange={this.onChange.bind(this)}
              onBlur={this.onInputFocusOut.bind(this)}
            />
            {this.inputBorder('email')}
          </div>
          <div className="input" >
            <Autocomplete
              wrapperStyle={{width: '100%', 'zIndex': '99999999999'}}
              inputProps={{name: "location", type: "text", placeholder: "Where"}}
              ref="location"
              value={location}
              items={geoResults}
              getItemValue={(item) => item.name}
              onSelect={(value, item) => {
                this.props.set_search_value(null, 'location', value)
              }}
              onChange={this.onLocationChange.bind(this)}
              renderItem={(item, isHighlighted) => (
                <div key={item.abbr} id={item.abbr} >{item.name}</div>
              )}
            />
            {this.inputBorder()}
          </div>
          <div className="input" data-tip="min. 8 characters">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.onChange.bind(this)}
              onBlur={this.onInputFocusOut.bind(this)}
            />
            {this.inputBorder('password')}
          </div>

          <ReactTooltip place="right" effect="solid" type="dark" />

          <RadioToggler
            itemList={[
              {ref: 'gender', name: 'gender', value: '0', checked: true, title: 'male'},
              {ref: 'gender', name: 'gender', value: '1', checked: false, title: 'female'},
            ]}
            onChangeCallback={this.onChange.bind(this)}
          />
        </div>

        <button type="submit" className="submit">Sign up</button>
        <Link to="/auth/login" className="link">Log in</Link>
      </form>
    )
  }
}

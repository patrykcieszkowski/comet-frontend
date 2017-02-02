import React from 'react'
import Autocomplete from 'react-autocomplete'
import RadioToggler from '../assets/RadioToggler'

export default class SearchForm extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      geoTimeout: null
    }
  }

  searchFormSubmit(e)
  {
    e.preventDefault()
    let { name, gender, online, page } = this.props.search.people.query
    let { location } = this.props.search
    this.props.fetch_search('people', name, location, gender, online, page)
  }

  onChange(e)
  {
    let value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value
    this.props.set_search_value('people', e.target.name, value)
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

  render()
  {
    let { name, gender, online } = this.props.search.people.query
    let { geoResults, location } = this.props.search

    return (
      <header style={{minHeight: '230px', background: '#fff'}} className="info">
        <form className="search" onSubmit={this.searchFormSubmit.bind(this)}>
          <div style={{flexDirection: 'column'}} className="block spacer">
            <div className="input">
              <input
                type="text"
                placeholder="Name or Email address"
                name="name"
                defaultValue={name}
                onChange={this.onChange.bind(this)}
              />
              <div className="fake-border"></div>
            </div>

            <div className="input">

              <Autocomplete
                wrapperStyle={{width: '100%'}}
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

              <div className="fake-border"></div>
            </div>

          </div>
          <div className="block dobule spacer">
            <div className="block online-check">
              <label>
                <input
                  type="checkbox"
                  name="online"
                  checked={online}
                  onChange={this.onChange.bind(this)}
                />
                <span className="title">currently online</span>
              </label>
            </div>

            <RadioToggler
              itemList={[
                {ref: 'gender', name: 'gender', value: '0', checked: true, title: 'male'},
                {ref: 'gender', name: 'gender', value: '1', checked: false, title: 'female'},
              ]}
              onChangeCallback={this.onChange.bind(this)}
            />
          </div>
          <button type="submit" className="submit">Search</button>
        </form>

        <a href="#" className="hide">
          <span className="icon arrow_up"></span>
        </a>
      </header>
    )
  }

}

import React from 'react'

export default class UserContent extends React.Component
{
  renderGeoListItem(geo)
  {
    if (!geo) return
    return (
      <li>
        <div className="block input">
          <span className="value">{geo}</span>
        </div>
      </li>
    )
  }

  renderPhoneNumber(phoneObj)
  {
    if (!phoneObj) return
    return (
      <li>
        <div className="block input">
          <span className="value">{phoneObj.full}</span>
        </div>
      </li>
    )
  }

  render()
  {
    let {person} = this.props
    let gender = (person.user.gender == 0) ? "Male" : "Female"
    let geo = (person.user.geo) ? person.user.geo.name : null
    return (
      <section className="user-details">
        <div className="block list">
          <ul>
            {this.renderPhoneNumber(person.user.phone)}
            {this.renderGeoListItem(geo)}
            <li>
              <div className="block input">
                <span className="value">{gender}</span>
              </div>
            </li>
            <li>
              <div className="block input">
                <span className="value">Joined {person.user.createdAt}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}

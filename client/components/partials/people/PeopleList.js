import React from 'react'
import PeopleListItem from './PeopleListItem'
import { Scrollbars } from 'react-custom-scrollbars'

export default class PeopleList extends React.Component
{
  render()
  {
    let userList = this.props.people
    let local_settings = this.props.local_settings
    if (local_settings.people.filter_online)
    {
      userList = userList.filter((item, n, arr) => (item.online))
    }

    return (
      <div className="contact-list">
        <Scrollbars
          className="contact-list content"
          ref="peopleList"
        >
          {userList.map((person) => {
            return (
              <PeopleListItem user={person} key={person._id} />
            )
          }) }
        </Scrollbars>
      </div>
    )
  }
}

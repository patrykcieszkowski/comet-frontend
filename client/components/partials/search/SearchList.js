import React from 'react'
import SearchListItem from './SearchListItem'
import { Scrollbars } from 'react-custom-scrollbars';

export default class SearchList extends React.Component
{
  render()
  {
    return (
      <div className="contact-list">
        <Scrollbars
          className="contact-list search content"
          ref="contactList">
          {this.props.search.people.result.map((user) =>
            {
              return (
                <SearchListItem user={user} key={user._id} />
              )
            })
          }
      </Scrollbars>
    </div>

    )
  }
}

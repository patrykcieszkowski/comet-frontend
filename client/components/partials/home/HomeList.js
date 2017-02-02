import React from 'react'
import HomeListItem from './HomeListItem'
import { Scrollbars } from 'react-custom-scrollbars';

export default class HomeList extends React.Component
{
  render()
  {
    return (
      <div className="contact-list msg">
        <Scrollbars
          className="contact-list content msg"
          ref="contactList"
          >
          {this.props.conversations.map((conv) => {
            return (
              <HomeListItem
                conversation={conv}
                key={conv.conv._id}
              />
            )
          }) }
        </Scrollbars>
      </div>
    )
  }
}

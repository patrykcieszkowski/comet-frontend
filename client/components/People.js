import React from 'react'
import PeopleHeader from './partials/people/PeopleHeader'
import PeopleList from './partials/people/PeopleList'

class People extends React.Component
{
  render()
  {
    return (
      <article className="main">
        {React.cloneElement(<PeopleHeader />, this.props)}
        {React.cloneElement(<PeopleList />, this.props)}
      </article>
    )
  }
}

People.defaultProps = {
  displayName: 'people'
}

export default People

import React from 'react'
import SearchForm from './partials/search/SearchForm'
import SearchList from './partials/search/SearchList'

export default class Search extends React.Component
{
  render()
  {
    return (
      <article className="main">
        {React.cloneElement(<SearchForm />, this.props)}
        {React.cloneElement(<SearchList />, this.props)}
      </article>
    )
  }
}

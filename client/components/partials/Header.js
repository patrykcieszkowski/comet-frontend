import React from 'react'
import {Link, IndexLink} from 'react-router'

export default class Header extends React.Component
{
  render()
  {
    return (
      <header className="top">
        <nav>
          <ul>
            <li><IndexLink to="/" activeClassName="active"> <img src="../../img/icons/nav/home.png"/></IndexLink></li>
            <li><Link to={"/people"} activeClassName="active"><img src="../../img/icons/nav/people.png"/></Link></li>
            <li><Link to={"/search"} activeClassName="active"><img src="../../img/icons/nav/search.png"/></Link></li>
            <li><Link to={"/settings"} activeClassName="active"><img src="../../img/icons/nav/settings.png"/></Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

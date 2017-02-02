import React from 'react'
import SettingsHeader from './partials/settings/SettingsHeader'
import SettingsContent from './partials/settings/SettingsContent'

export default class Settings extends React.Component
{
  render()
  {
    return (
      <article className="main">
        {React.cloneElement(<SettingsHeader/>, this.props)}
        {React.cloneElement(<SettingsContent/>, this.props)}
      </article>
    )
  }
}

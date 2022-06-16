/* globals window, document */

'use strict'

import { topsmith, ComponentText } from './../src/index.js'

import './app.scss'

import { PageHome } from './pages/home'
import { PageAccount } from './pages/account'
import { PageNews } from './pages/news'

import { SectionProjects } from './sections/projects'

window.addEventListener( 'load', () => {
  topsmith.debug( true )

  topsmith.addComponent( ComponentText )

  topsmith
    // Side
    .set( 'side.navigation.home', {
      order: 1, // Order in the list
      icon: 'home', // Google icon to use
      tooltip: 'home', // The tooltip
      url: '/', // Url to redirect to OR null
      external: false, // If the url points to external url
      target: null, // Anchor target
      match: /^\/$/i, // Set active if url matches pattern OR null
      section: null, // Opens the section name in the section part of side
      counter: '' // Will show the icon counter with this value
    } )
    .set( 'side.navigation.projects', {
      order: 2,
      icon: 'grid_view',
      tooltip: 'projects',
      section: 'projects'
    } )
    .set( 'side.menu.notifications', {
      order: 1,
      icon: 'notifications',
      tooltip: 'notifications',
      url: '/notifications',
      match: /^\/notifications$/i,
      counter: '99'
    } )

    // Header
    .set( 'header.buttons.account', {
      order: 1,
      icon: 'account_circle',
      tooltip: 'account',
      url: '/account',
      match: /^\/account$/i
    } )
    .set( 'header.buttons.logout', {
      order: 2,
      icon: 'logout',
      tooltip: 'logout',
      url: '/logout',
      match: /^\/logout$/i
    } )

    // Pages
    .set( 'pages.home', PageHome )
    .set( 'pages.account', PageAccount )
    .set( 'pages.news', PageNews )

    // Sections
    .set( 'side.sections.projects', SectionProjects )

  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

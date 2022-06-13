/* globals window, document */

'use strict'

import { topsmith } from './../src/index.js'

import './app.scss'

import { PageHome } from './pages/home'
import { PageAccount } from './pages/account'
import { PageNews } from './pages/news'

import { SectionProjects } from './sections/projects'

window.addEventListener( 'load', () => {
  topsmith.debug( true )

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
      section: null // Opens the section name in the section part of side
    } )
    .set( 'side.navigation.projects', {
      order: 2,
      icon: 'grid_view',
      tooltip: 'projects',
      url: null,
      external: false,
      target: null,
      match: null,
      section: 'projects'
    } )
    .set( 'side.menu.account', {
      order: 1,
      icon: 'account_circle',
      tooltip: 'account circle',
      url: '/account',
      external: false,
      target: null,
      match: /^\/account$/i,
      section: null
    } )

    // Header
    .set( 'header.buttons.notifications', {
      order: 1,
      icon: 'notifications',
      tooltip: 'notifications',
      url: '/notifications',
      external: false,
      target: null,
      match: /^\/notifications$/i
    } )
    .set( 'header.buttons.logs', {
      order: 2,
      icon: 'browse_activity',
      tooltip: 'logs',
      url: '/logs',
      external: false,
      target: null,
      match: /^\/logs$/i
    } )

    // Pages
    .set( 'pages.home', PageHome )
    .set( 'pages.account', PageAccount )
    .set( 'pages.news', PageNews )

    // Sections
    .set( 'side.sections.projects', SectionProjects )

  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

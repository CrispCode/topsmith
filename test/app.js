/* globals window, document */

'use strict'

import { topsmith } from './../src/index.js'

import './app.scss'

import { PageHome } from './pages/home'
import { PageAccount } from './pages/account'
import { PageNews } from './pages/news'

import { PageComponents } from './pages/components'
import { PageCss } from './pages/css'

import { PageCalendar } from './pages/components/calendar/index.js'
import { PageClock } from './pages/components/clock/index.js'
import { PageDatatable } from './pages/components/datatable/index.js'
import { PageHtmlEditor } from './pages/components/html-editor/index.js'

import { SectionComponents } from './sections/components'

window.addEventListener( 'load', () => {
  topsmith.debug( true )

  topsmith
    // Side
    .set( 'side.navigation.home', {
      order: 1, // Order in the list
      icon: 'home', // Google icon to use
      tooltip: 'home', // The tooltip
      url: '/', // Url to redirect to OR null
      match: /^\/$/i, // Set active if url matches pattern OR null
      external: false, // If the url points to external url
      target: null, // Anchor target
      section: null, // Opens the section name in the section part of side
      counter: '' // Will show the icon counter with this value
    } )
    .set( 'side.navigation.components', {
      order: 2,
      icon: 'grid_view',
      tooltip: 'components',
      url: '/components',
      match: /^\/components.*/i,
      section: 'components'
    } )
    .set( 'side.navigation.css', {
      order: 3,
      icon: 'format_paint',
      tooltip: 'css',
      url: '/css',
      match: /^\/css.*/i,
      section: 'css'
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

    .set( 'pages.components', PageComponents )
    .set( 'pages.component-calendar', PageCalendar )
    .set( 'pages.component-clock', PageClock )
    .set( 'pages.component-datatable', PageDatatable )
    .set( 'pages.component-html-editor', PageHtmlEditor )

    .set( 'pages.css', PageCss )

    // Sections
    .set( 'side.sections.components', SectionComponents )

  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

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
    .set( 'pages.home', PageHome )
    .set( 'pages.account', PageAccount )
    .set( 'pages.news', PageNews )
    .set( 'pages.news2', PageNews )
    .set( 'pages.news3', PageNews )
    .set( 'pages.news4', PageNews )
    .set( 'pages.home2', PageHome )

    .set( 'side.sections.projects', SectionProjects )

  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

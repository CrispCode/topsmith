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
    .set( 'structure.main.pages.home', PageHome )
    .set( 'structure.main.pages.account', PageAccount )
    .set( 'structure.main.pages.news', PageNews )
    .set( 'structure.main.pages.news2', PageNews )
    .set( 'structure.main.pages.news3', PageNews )
    .set( 'structure.main.pages.news4', PageNews )
    .set( 'structure.main.pages.home2', PageHome )

    .set( 'structure.side.sections.projects', SectionProjects )

  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

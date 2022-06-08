/* globals window, document */

'use strict'

import { topsmith } from './../src/index.js'

import './app.scss'

window.addEventListener( 'load', () => {
  topsmith.debug( true )
  topsmith.bootstrap( document.querySelector( '#topsmith' ) )
} )

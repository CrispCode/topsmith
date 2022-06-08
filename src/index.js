/* globals document */

'use strict'

import {
  Module,

  extend,
  logger
} from '@crispcode/modux'

import './styles.scss'

import { Frame } from './core/frame'
import { ComponentPage } from './core/page'

import { config } from './config.js'

class Topsmith {
  constructor () {
    // Create application
    this.app = new Module( 'Topsmith' )

    this.app
      .addDependency( 'frame', Frame )

    this.app.store.set( 'topsmith', config )

    this.element = document.querySelector( 'body' )
  }

  get component () {
    return {
      page: ComponentPage
    }
  }

  debug ( debugging ) {
    // Set logger debug mode
    logger.enabled( debugging )
  }

  bootstrap ( element, configuration = {} ) {
    // Start application
    this.element = element || this.element
    this.app.store.set( 'topsmith', extend( this.app.store.get( 'topsmith' ), configuration ) )
    this.app.bootstrap( this.element, 'frame' )
  }

  get ( name ) {
    if ( name ) {
      return this.app.store.get( 'topsmith.' + name )
    } else {
      return this.app.store.get( 'topsmith' )
    }
  }

  set ( name, value ) {
    if ( name ) {
      this.app.store.set( 'topsmith.' + name, value )
    } else {
      this.app.store.get( 'topsmith', value )
    }
    return this
  }
}

export let topsmith = new Topsmith()

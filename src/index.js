/* globals document */

'use strict'

import {
  Module,

  extend,
  logger
} from '@crispcode/modux'

import './styles.scss'

import { Frame } from './core/frame'
import { Page } from './core/page'
import { Section } from './core/section'

import { defaults } from './config.js'

// Components
import { ComponentText } from './components/text'

class Topsmith {
  constructor () {
    // Create application
    this.app = new Module( 'Topsmith' )

    this.app
      .addDependency( 'frame', Frame )

    this.app.store.set( 'topsmith', defaults )

    this.element = document.querySelector( 'body' )
  }

  get classes () {
    return {
      Page: Page,
      Section: Section
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

  addComponent ( component ) {
    let nameParts = component.name.split( /(?=[A-Z])/ )
    nameParts = nameParts.map( ( value ) => {
      return value.toLowerCase()
    } )
    this.app.addDependency( 'topsmith-' + nameParts.join( '-' ), component )
  }
}

let topsmith = new Topsmith()

export {
  topsmith,
  ComponentText
}

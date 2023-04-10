/* globals document */

'use strict'

import {
  Module,

  extend,
  html,
  logger
} from '@crispcode/modux'

import styles from './styles.inline.scss'

import { Frame } from './core/frame'
import { Page } from './core/page'
import { Section } from './core/section'

import { defaults } from './config.js'

// Components
import { ComponentCalendar } from './components/calendar'
import { ComponentClock } from './components/clock'
import { ComponentDatatable } from './components/datatable'
import { ComponentHtmlEditor } from './components/html-editor'

class Topsmith {
  constructor () {
    // Create application
    this.app = new Module( 'Topsmith' )

    this.app
      .addDependency( 'frame', Frame )

    this.app.store.set( 'topsmith', defaults )

    this.style = html( '<style></style>' )
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

  bootstrap ( element = null, style = null, configuration = {} ) {
    // Add styles
    this.style = style || this.style
    this.style.append( styles )
    if ( !style ) {
      document.head.append( this.style )
    }

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
      this.app.store.set( 'topsmith', value )
    }
    return this
  }

  registerComponent ( component ) {
    let nameParts = component.name.split( /(?=[A-Z])/ )
    nameParts = nameParts.map( ( value ) => {
      return value.toLowerCase()
    } )
    this.app.addDependency( 'topsmith-' + nameParts.join( '-' ), component )
    return 'topsmith-' + nameParts.join( '-' )
  }

  renderComponent ( element, dependency ) {
    if ( dependency ) {
      this.app.__createComponent( element, dependency )
    } else {
      this.app.createComponent( element )
    }
    return element.moduxComponent
  }

  popup ( template ) {
    this.app.store.set( 'topsmith.#.popup', template )
  }
}

let topsmith = new Topsmith()

export {
  topsmith,
  ComponentCalendar,
  ComponentClock,
  ComponentDatatable,
  ComponentHtmlEditor
}

'use strict'

import { topsmith } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageAccount extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/account$/i
  }

  static get settings () {
    return {
      size: 'x2'
    }
  }

  execute () {
    let calendar = topsmith.renderComponent( this.element.querySelector( '#calendar' ) )
    calendar.set( 'date', '1984-07-22' )
    calendar.set( 'days', 'D,L,M,M,J,V,S' )

    let clock = topsmith.renderComponent( this.element.querySelector( '#clock' ) )
    setInterval( () => {
      clock.set( 'time', Date().toString() )
    }, 1000 )
  }
}

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Header extends Component {
  get template () {
    return template
  }

  execute () {
    this.store.on( 'topsmith.title', ( title ) => {
      this.element.querySelector( '.topsmith-header-content-text-title' ).innerHTML = title
    }, true )
    this.store.on( 'topsmith.description', ( description ) => {
      this.element.querySelector( '.topsmith-header-content-text-description' ).innerHTML = description
    }, true )
  }
}

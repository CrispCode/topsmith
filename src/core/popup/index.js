'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Popup extends Component {
  get template () {
    return template
  }

  execute () {
    this.element.classList.add( 'hide' )

    this.element.addEventListener( 'click', () => {
      this.store.set( 'topsmith.#.popup', null )
    } )

    this.store.on( 'topsmith.#.popup', ( template ) => {
      if ( template ) {
        this.element.querySelector( '.topsmith-popup-content-container' ).innerHTML = ''
        this.element.querySelector( '.topsmith-popup-content-container' ).appendChild( template )
        this.element.classList.remove( 'hide' )
        this.element.querySelector( '.topsmith-popup-content-container' ).classList.add( 'show' )
      } else {
        this.element.classList.add( 'hide' )
        this.element.querySelector( '.topsmith-popup-content-container' ).classList.remove( 'show' )
      }
    }, true )
  }
}

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

import { Side } from './../side'
import { Header } from './../header'
import { Main } from './../main'
import { Footer } from './../footer'
import { Popup } from '../popup'

export class Frame extends Component {
  get template () {
    return template
  }

  add ( name, code ) {
    this.module.addDependency( name, code )
    this.element.querySelector( '.topsmith-' + name ).innerHTML = ''
    this.element.querySelector( '.topsmith-' + name ).setAttribute( 'data-modux-component', name )
  }

  init () {
    this.add( 'side', Side )
    this.add( 'header', Header )
    this.add( 'main', Main )
    this.add( 'footer', Footer )
    this.add( 'popup', Popup )
  }

  execute () {
    this.store.on( 'topsmith.#.side.open', ( open ) => {
      if ( open ) {
        this.element.querySelector( '.topsmith-content' ).classList.add( 'scroll-lock' )
      } else {
        this.element.querySelector( '.topsmith-content' ).classList.remove( 'scroll-lock' )
      }
    }, true )
  }
}

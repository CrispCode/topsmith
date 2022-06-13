/* globals HTMLElement */

'use strict'

import { Component, html } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Footer extends Component {
  get template () {
    return template
  }

  execute () {
    this.store.on( 'topsmith.footer', ( footer ) => {
      if ( typeof footer === 'string' ) {
        this.element.innerHTML = footer
      }
      if ( footer instanceof HTMLElement ) {
        this.element.innerHTML = ''
        this.element.appendChild( footer )
      }
      if ( footer instanceof Component ) {
        this.element.innerHTML = ''
        this.module.addDependency( 'footer-content', footer )
        this.element.appendChild( html( '<section data-modux-component="footer-content"></section>' ) )
      }
    }, true )
  }

  terminate () {
    this.module.removeDependency( 'footer-content' )
  }
}

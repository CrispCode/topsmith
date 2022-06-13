'use strict'

import { Component, html, loop, Url } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Main extends Component {
  get template () {
    return template
  }

  onStateChange ( url ) {
    url = new Url( url )

    let pages = this.store.get( 'topsmith.pages' )
    let instances = {}

    // Get all pages that match url
    loop( pages, ( page, name ) => {
      let parameters = url.path.match( page.url )
      if ( parameters ) {
        instances[ name ] = page
      }
    } )

    // Remove unneeded pages
    loop( Object.assign( {}, this.element.children ), ( element ) => {
      if ( !instances[ element.getAttribute( 'data-page-name' ) ] ) {
        element.classList.add( 'hide' )
        element.remove()
        this.module.removeDependency( 'page-' + element.getAttribute( 'data-page-name' ) )
      }
    } )

    // Add needed pages
    loop( instances, ( page, name ) => {
      // If it doesn't already exist add it
      if ( !this.element.querySelector( '[data-page-name="' + name + '"]' ) ) {
        this.module.addDependency( 'page-' + name, page )
        let element = html( '<section data-modux-component="page-' + name + '" data-page-name="' + name + '" class="' + ( page.settings.css || '' ) + ' ' + ( ( page.settings.size ) ? page.settings.size : 'x3' ) + '"></section>' )
        this.module.createComponent( element )
        this.element.appendChild( element )
      }
    } )
  }
}

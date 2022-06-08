'use strict'

import { Component, html, loop } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Main extends Component {
  get template () {
    return template
  }

  onStateChange ( url ) {
    let pages = this.store.get( 'topsmith.structure.main.pages' )
    let instances = {}

    // Get all pages that match url
    if ( Array.isArray( pages ) ) {
      loop( pages, ( page ) => {
        let parameters = url.match( page.url )
        if ( parameters ) {
          instances[ page.name ] = page
        }
      } )
    }

    // Remove unneeded pages
    loop( this.element.children, ( element ) => {
      if ( !instances[ element.getAttribute( 'data-page-name' ) ] ) {
        element.remove()
        this.module.removeDependency( 'page-' + element.getAttribute( 'data-page-name' ) )
      }
    } )

    // Add needed pages
    loop( instances, ( page, name ) => {
      // If it doesn't already exist add it
      if ( !this.element.querySelector( '[data-page-name]' ) ) {
        this.module.addDependency( 'page-' + name, page )
        let element = html( '<section data-modux-component="page-' + name + '" data-page-name="' + name + '"></section>' )
        this.module.createComponent( element )
        this.element.append( element )
      }
    } )
  }
}

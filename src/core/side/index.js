'use strict'

import { Component, html, loop, isObject } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Side extends Component {
  get template () {
    return template
  }

  createItem ( key, data ) {
    const element = html( '<a class="topsmith-side-content-icon" data-icon-name="' + key + '" data-tooltip=""><span class="material-symbols-rounded"></span></a>' )
    this.updateItem( data, element )
    return element
  }

  updateItem ( data, element ) {
    loop( data, ( value, name ) => {
      switch ( name ) {
        case 'order':
          element.style.order = value
          break
        case 'icon':
          if ( value !== element.firstElementChild.innerHTML ) {
            element.firstElementChild.innerHTML = value
          }
          break
        case 'tooltip':
          if ( value !== element.getAttribute( 'data-tooltip' ) ) {
            element.setAttribute( 'data-tooltip', value )
          }
          break
        case 'url':
          if ( value !== element.href ) {
            element.href = value
          }
          break
        case 'external':
          if ( !value ) {
            element.setAttribute( 'data-modux-link', '' )
          }
          break
        case 'target':
          if ( value ) {
            element.setAttribute( 'target', value )
          }
          break
        case 'active':
          if ( value ) {
            element.classList.add( 'active' )
          } else {
            element.classList.remove( 'active' )
          }
          break
      }
    } )
  }

  updateItems ( section, items ) {
    let container = this.element.querySelector( '.topsmith-side-content-' + section )

    // Remove unused elements
    loop( container.children, ( element ) => {
      if ( !items[ element.getAttribute( 'data-icon-name' ) ] ) {
        element.remove()
      }
    } )

    loop( items, ( value, key ) => {
      let element = container.querySelector( '[data-icon-name="' + key + '"]' )
      if ( element ) {
        // Update element
        this.updateItem( value, element )
      } else {
        // Create element
        container.appendChild( this.createItem( key, value ) )
      }
    } )
  }

  onStateChange ( url ) {
    loop( [ 'navigation', 'menu' ], ( category ) => {
      loop( this.store.get( 'topsmith.structure.side.' + category ), ( data, key ) => {
        if ( data.match ) {
          let parameters = url.match( data.match )
          if ( parameters ) {
            this.store.set( 'topsmith.structure.side.' + category + '.' + key + '.active', true )
          } else {
            this.store.set( 'topsmith.structure.side.' + category + '.' + key + '.active', false )
          }
        }
      } )
    } )
  }

  execute () {
    this.store.on( 'topsmith.structure.side', ( config ) => {
      if ( isObject( config.logo ) ) {
        let logo = this.element.querySelector( '.topsmith-side-content-logo' )
        logo.href = config.logo.url || '/'
        logo.querySelector( '.topsmith-side-content-logo-image' ).src = config.logo.image
      }
      this.updateItems( 'navigation', config.navigation || {} )
      this.updateItems( 'menu', config.menu || {} )
    }, true )
  }
}

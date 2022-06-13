'use strict'

import { Component, loop, html, isObject, Url } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Header extends Component {
  get template () {
    return template
  }

  createItem ( key, data ) {
    const element = html( '<a class="topsmith-header-content-button" data-icon-name="' + key + '"><span class="material-symbols-rounded"></span><span class="topsmith-header-content-button-tooltip"></span></a>' )
    element.__watcher = this.store.on( 'topsmith.#.header.buttons.' + key, ( data ) => {
      // We only change class if it's needed
      if ( data.active && !element.classList.contains( 'active' ) ) {
        element.classList.add( 'active' )
      }
      if ( !data.active && element.classList.contains( 'active' ) ) {
        element.classList.remove( 'active' )
      }
    } )
    element.addEventListener( 'click', () => {
      this.store.set( 'topsmith.#.side.section', null )
    } )
    this.updateItem( data, element )
    return element
  }

  updateItem ( data, element ) {
    loop( data, ( value, name ) => {
      switch ( name ) {
        case 'order':
          if ( value ) {
            element.style.order = value
          }
          break
        case 'icon':
          if ( value !== element.firstElementChild.innerHTML ) {
            element.firstElementChild.innerHTML = value
          }
          break
        case 'tooltip':
          let tooltip = element.querySelector( '.topsmith-header-content-button-tooltip' )
          if ( value !== tooltip.innerHTML ) {
            tooltip.innerHTML = value
          }
          break
        case 'url':
          if ( value && value !== element.href ) {
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
      }
    } )
  }

  updateItems ( items ) {
    let container = this.element.querySelector( '.topsmith-header-content-buttons' )

    // Remove unused elements
    loop( Object.assign( {}, container.children ), ( element ) => {
      if ( !items[ element.getAttribute( 'data-icon-name' ) ] ) {
        element.__watcher()
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
    url = new Url( url )
    loop( this.store.get( 'topsmith.header.buttons' ), ( data, key ) => {
      if ( data.match ) {
        let parameters = url.path.match( data.match )
        let isActive = false
        if ( parameters ) {
          isActive = true
        }
        this.store.set( 'topsmith.#.header.buttons.' + key + '.active', isActive )
      }
    } )
  }

  execute () {
    this.element.querySelector( '.topsmith-header-content-menu' ).addEventListener( 'click', () => {
      this.store.set( 'topsmith.#.side.open', true )
    } )

    this.store.on( 'topsmith.header.logo', ( logo ) => {
      if ( isObject( logo ) ) {
        let element = this.element.querySelector( '.topsmith-header-content-logo' )
        element.href = logo.url || '/'
        element.querySelector( '.topsmith-header-content-logo-image' ).src = logo.image
      }
    }, true )

    this.store.on( 'topsmith.header.title', ( title ) => {
      this.element.querySelector( '.topsmith-header-content-text-title' ).innerHTML = title
    }, true )

    this.store.on( 'topsmith.header.description', ( description ) => {
      this.element.querySelector( '.topsmith-header-content-text-description' ).innerHTML = description
    }, true )

    this.store.on( 'topsmith.header.buttons', ( buttons ) => {
      this.updateItems( buttons )
    }, true )
  }
}

'use strict'

import { Component, html, loop, isObject, Url } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Side extends Component {
  get template () {
    return template
  }

  createItem ( category, key, data ) {
    const element = html( '<a class="topsmith-side-content-icon" data-icon-name="' + key + '" data-tooltip="" data-counter="" data-modux-link=""><span class="material-symbols-rounded"></span></a>' )
    element.__watcher = this.store.on( 'topsmith.#.side.' + category + '.' + key, ( data ) => {
      // We only change class if it's needed
      if ( data.active && !element.classList.contains( 'active' ) ) {
        element.classList.add( 'active' )
      }
      if ( !data.active && element.classList.contains( 'active' ) ) {
        element.classList.remove( 'active' )
      }
    } )
    element.addEventListener( 'click', () => {
      this.store.set( 'topsmith.#.side.section', data.section )
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
          if ( value !== element.getAttribute( 'data-tooltip' ) ) {
            element.setAttribute( 'data-tooltip', value )
          }
          break
        case 'url':
          if ( value && value !== element.href ) {
            element.href = value
          }
          break
        case 'external':
          if ( value ) {
            element.removeAttribute( 'data-modux-link' )
          } else {
            element.setAttribute( 'data-modux-link', '' )
          }
          break
        case 'target':
          if ( value ) {
            element.setAttribute( 'target', value )
          } else {
            element.removeAttribute( 'target' )
          }
          break
        case 'section':
          if ( value ) {
            element.setAttribute( 'data-section', value )
          }
          break
        case 'counter':
          if ( value !== element.getAttribute( 'data-counter' ) ) {
            element.setAttribute( 'data-counter', value )
          }
          break
      }
    } )
  }

  updateItems ( category, items ) {
    let container = this.element.querySelector( '.topsmith-side-content-' + category )

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
        container.appendChild( this.createItem( category, key, value ) )
      }
    } )
  }

  onStateChange ( url ) {
    url = new Url( url )
    loop( [ 'navigation', 'menu' ], ( category ) => {
      loop( this.store.get( 'topsmith.side.' + category ), ( data, key ) => {
        if ( data.match ) {
          let parameters = url.path.match( data.match )
          let isActive = false
          if ( parameters ) {
            isActive = true
            this.store.set( 'topsmith.#.side.section', this.store.get( 'topsmith.side.' + category + '.' + key + '.section' ) )
          }
          this.store.set( 'topsmith.#.side.' + category + '.' + key + '.active', isActive )
        }
      } )
    } )
  }

  execute () {
    this.element.querySelector( '.topsmith-side-content-overlay' ).addEventListener( 'click', () => {
      this.store.set( 'topsmith.#.side.open', false )
    } )

    this.store.on( 'topsmith.side.logo', ( logo ) => {
      if ( isObject( logo ) ) {
        let element = this.element.querySelector( '.topsmith-side-content-logo' )
        element.href = logo.url || '/'
        element.querySelector( '.topsmith-side-content-logo-image' ).src = logo.image
      }
    }, true )

    this.store.on( 'topsmith.side.navigation', ( navigation ) => {
      this.updateItems( 'navigation', navigation || {} )
    }, true )

    this.store.on( 'topsmith.side.menu', ( menu ) => {
      this.updateItems( 'menu', menu || {} )
    }, true )

    this.store.on( 'topsmith.#.side.section', ( name ) => {
      let container = this.element.querySelector( '.topsmith-side-content-sections' )
      let sections = this.store.get( 'topsmith.side.sections' )

      // Only make changes if they are needed
      let previous = container.querySelector( '[data-modux-componet]' )
      if ( !previous || ( previous && previous.getAttribute( '[data-section-name]' ) !== name ) ) {
        // Remove previous section
        if ( container.firstElementChild ) {
          container.firstElementChild.remove()
        }
        if ( name && sections[ name ] ) {
          // Update section panel
          const element = html( '<section data-modux-component="section-' + name + '" data-section-name="' + name + '"></section>' )
          this.module.addDependency( 'section-' + name, sections[ name ] )
          this.module.createComponent( element )
          container.appendChild( element )
        }
      }
    }, true )

    this.store.on( 'topsmith.#.side.open', ( open ) => {
      if ( open ) {
        this.element.classList.add( 'open' )
      } else {
        this.element.classList.remove( 'open' )
      }
    }, true )
  }
}

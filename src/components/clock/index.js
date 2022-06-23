'use strict'

import { html } from '@crispcode/modux'
import { BaseComponent } from './../base-component'

import template from './template.html'
import './styles.scss'

export class ComponentClock extends BaseComponent {
  get template () {
    return template
  }

  _refresh () {
    let time = this.get( 'time' )

    this.element.querySelector( '.component-clock-graphic-hour' ).style.transform = 'rotate(' + ( time.getHours() * 360 / 12 - 90 ) + 'deg)'
    this.element.querySelector( '.component-clock-graphic-minute' ).style.transform = 'rotate(' + ( time.getMinutes() * 360 / 60 - 90 ) + 'deg)'
    this.element.querySelector( '.component-clock-graphic-second' ).style.transform = 'rotate(' + ( time.getSeconds() * 360 / 60 - 90 ) + 'deg)'
  }

  setup () {
    return {
      name: {
        default: '',
        attribute: 'data-name',
        update: ( value ) => {
          this.element.querySelector( '.component-clock-input' ).setAttribute( 'name', value )
        }
      },
      locked: {
        default: false,
        attribute: 'data-locked',
        parse: ( value ) => {
          // String to Boolean
          if ( typeof value === 'string' ) {
            value = value.toLowerCase() !== 'false'
          }
          return value
        },
        update: ( value ) => {
          if ( value ) {
            this.element.classList.add( 'locked' )
            this.element.querySelector( '.component-clock-hours' ).setAttribute( 'disabled', '' )
            this.element.querySelector( '.component-clock-minutes' ).setAttribute( 'disabled', '' )
            this.element.querySelector( '.component-clock-seconds' ).setAttribute( 'disabled', '' )
          } else {
            this.element.classList.remove( 'locked' )
            this.element.querySelector( '.component-clock-hours' ).removeAttribute( 'disabled', '' )
            this.element.querySelector( '.component-clock-minutes' ).removeAttribute( 'disabled', '' )
            this.element.querySelector( '.component-clock-seconds' ).removeAttribute( 'disabled', '' )
          }
        }
      },
      label: {
        default: '1,2,3,4,5,6,7,8,9,10,11,12',
        attribute: 'data-label',
        parse: ( value ) => {
          // String to Array
          if ( !Array.isArray( value ) ) {
            value = value.split( ',' )
          }
          return value
        },
        update: ( value ) => {
          let container = this.element.querySelector( '.component-clock-labels' )
          container.innerHTML = ''
          for ( let i = 0; i < value.length; i++ ) {
            let label = html( '<span class="component-clock-labels-number">' + value[ i ] + '</span>' )
            container.appendChild( label )
            label.style.transform = 'rotate(' + ( ( i + 1 ) * 360 / 12 - 90 ) + 'deg) translate(4.8em) rotate(calc(-1 * ' + ( ( i + 1 ) * 360 / 12 - 90 ) + 'deg))'
          }
        }
      },
      time: {
        default: new Date(),
        attribute: 'data-time',
        parse: ( value ) => {
          // String to Date
          if ( typeof value === 'string' ) {
            if ( ( new Date( value ) ).toString() === 'Invalid Date' ) {
              let parts = value.split( ':' )
              value = new Date()
              value.setHours( parseInt( parts[ 0 ] ) )
              value.setMinutes( parseInt( parts[ 1 ] ) )
              value.setSeconds( parseInt( parts[ 2 ] ) )
            } else {
              value = new Date( value )
            }
          }
          return value
        },
        update: ( value ) => {
          const padding = ( value ) => {
            return ( value < 10 ) ? '0' + value : value
          }
          let input = this.element.querySelector( '.component-clock-input' )
          input.value = padding( value.getHours() ) + ':' + padding( value.getMinutes() ) + ':' + padding( value.getSeconds() )
          input.dispatchEvent( new Event( 'input', { bubbles: true } ) )
          input.dispatchEvent( new Event( 'change', { bubbles: true } ) )

          // Update hours selector
          this.element.querySelector( '.component-clock-hours' ).value = padding( value.getHours() )
          // Update minutes selector
          this.element.querySelector( '.component-clock-minutes' ).value = padding( value.getMinutes() )
          // Update seconds selector
          this.element.querySelector( '.component-clock-seconds' ).value = padding( value.getSeconds() )

          // Update am/pm
          this.element.querySelector( '.component-clock-graphic-ampm' ).innerHTML = ( value.getHours() > 12 ) ? 'PM' : 'AM'

          this._refresh()
        }
      }
    }
  }

  execute () {
    this.element.querySelector( '.component-clock-hours' ).addEventListener( 'change', () => {
      let time = new Date( this.get( 'time' ) )
      time.setHours( this.element.querySelector( '.component-clock-hours' ).value )
      this.set( 'time', time )
    } )
    this.element.querySelector( '.component-clock-minutes' ).addEventListener( 'change', () => {
      let time = new Date( this.get( 'time' ) )
      time.setMinutes( this.element.querySelector( '.component-clock-minutes' ).value )
      this.set( 'time', time )
    } )
    this.element.querySelector( '.component-clock-seconds' ).addEventListener( 'change', () => {
      let time = new Date( this.get( 'time' ) )
      time.setSeconds( this.element.querySelector( '.component-clock-seconds' ).value )
      this.set( 'time', time )
    } )
  }

  get field () {
    return this.element.querySelector( '.component-clock-input' )
  }
}

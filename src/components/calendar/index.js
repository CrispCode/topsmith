'use strict'

import { html, loop } from '@crispcode/modux'
import { BaseComponent } from './../base-component'

import template from './template.html'
import './styles.scss'

export class ComponentCalendar extends BaseComponent {
  get template () {
    return template
  }

  _generateMonthData ( date ) {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    let lastDay = new Date( year, month + 1, 0 ).getDate()

    let data = []

    let week = 0
    for ( let i = 1; i <= lastDay; i++ ) {
      let dayOfWeek = new Date( year, month, i ).getDay()

      data.push( {
        day: i,
        month: month,
        year: year,
        dayOfWeek: dayOfWeek,
        week: week,
        current: ( day === i )
      } )

      if ( dayOfWeek === 6 ) {
        week++
      }
    }

    return data
  }

  _refresh () {
    let data = this._generateMonthData( this.get( 'date' ) )

    let now = new Date()

    let labels = this.get( 'days' )

    let calendar = this.element.querySelector( '.component-calendar-days' )
    calendar.innerHTML = ''

    // Header
    for ( let o = 0; o < labels.length; o++ ) {
      let headCol = html( '<div class="component-calendar-days-header">' + labels[ o ] + '</div>' )
      calendar.appendChild( headCol )
    }

    // Body
    let weeks = []
    loop( data, ( dataDay ) => {
      if ( !weeks[ dataDay.week ] ) {
        weeks[ dataDay.week ] = {}
      }
      weeks[ dataDay.week ][ dataDay.dayOfWeek ] = dataDay
    } )

    for ( let w = 0; w < weeks.length; w++ ) {
      let bodyCol = ''
      for ( let d = 0; d < 7; d++ ) {
        if ( weeks[ w ] && weeks[ w ][ d ] && weeks[ w ][ d ].dayOfWeek === d ) {
          let selected = ( weeks[ w ][ d ].current ) ? ' selected' : ''
          let today = ( !this.get( 'locked' ) && this.get( 'date' ).getFullYear() === now.getFullYear() && this.get( 'date' ).getMonth() === now.getMonth() && weeks[ w ][ d ].day === now.getDate() ) ? ' today' : ''
          bodyCol = html( '<div class="component-calendar-days-col' + selected + today + '">' + weeks[ w ][ d ].day + '</div>' )
          if ( !this.get( 'locked' ) ) {
            bodyCol.addEventListener( 'click', () => {
              let date = new Date( this.get( 'date' ) )
              date.setDate( weeks[ w ][ d ].day )
              this.set( 'date', date )
            } )
          }
        } else {
          bodyCol = html( '<div class="component-calendar-days-col"></div>' )
        }
        calendar.appendChild( bodyCol )
      }
    }
  }

  setup () {
    return {
      name: {
        default: '',
        attribute: 'data-name',
        update: ( value ) => {
          this.element.querySelector( '.component-calendar-input' ).setAttribute( 'name', value )
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
            this.element.querySelector( '.component-calendar-month' ).setAttribute( 'disabled', '' )
            this.element.querySelector( '.component-calendar-year' ).setAttribute( 'disabled', '' )
          } else {
            this.element.classList.remove( 'locked' )
            this.element.querySelector( '.component-calendar-month' ).removeAttribute( 'disabled' )
            this.element.querySelector( '.component-calendar-year' ).removeAttribute( 'disabled', '' )
          }
        }
      },
      days: {
        default: 'S,M,T,W,T,F,S',
        attribute: 'data-days',
        parse: ( value ) => {
          // String to Array
          if ( !Array.isArray( value ) ) {
            value = value.split( ',' )
          }
          return value
        },
        update: ( value ) => {
          loop( value, ( label, index ) => {
            let elements = this.element.querySelectorAll( '.component-calendar-days-header' )
            if ( elements.length > 0 ) {
              elements[ index ].innerHTML = label
            }
          } )
        }
      },
      months: {
        default: 'JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC',
        attribute: 'data-months',
        parse: ( value ) => {
          // String to Array
          if ( !Array.isArray( value ) ) {
            value = value.split( ',' )
          }
          return value
        },
        update: ( value ) => {
          loop( value, ( label, index ) => {
            let element = html( '<option value="' + index + '">' + label + '</option>' )
            if ( this.get( 'date' ) && this.get( 'date' ).getMonth() === index ) {
              element.setAttribute( 'selected', '' )
            }
            this.element.querySelector( '.component-calendar-month' ).appendChild( element )
          } )
        }
      },
      date: {
        default: new Date(),
        attribute: 'data-date',
        parse: ( value ) => {
          // String to Date
          if ( typeof value === 'string' ) {
            value = new Date( value )
          }
          return value
        },
        update: ( value ) => {
          let input = this.element.querySelector( '.component-calendar-input' )
          let padding = ( value ) => {
            return ( value < 10 ) ? '0' + value : value
          }
          input.value = value.getFullYear() + '-' + padding( value.getMonth() + 1 ) + '-' + padding( value.getDate() )
          input.dispatchEvent( new Event( 'input', { bubbles: true } ) )
          input.dispatchEvent( new Event( 'change', { bubbles: true } ) )

          // Update month selector
          this.element.querySelector( '.component-calendar-month > option[value="' + value.getMonth() + '"]' ).setAttribute( 'selected', '' )
          // Update year selector
          this.element.querySelector( '.component-calendar-year' ).value = value.getFullYear()

          this._refresh()
        }
      }

    }
  }

  execute () {
    this.element.querySelector( '.component-calendar-month' ).addEventListener( 'change', () => {
      let date = new Date( this.get( 'date' ) )
      date.setMonth( this.element.querySelector( '.component-calendar-month' ).value )
      this.set( 'date', date )
    } )
    this.element.querySelector( '.component-calendar-year' ).addEventListener( 'change', () => {
      let date = new Date( this.get( 'date' ) )
      date.setYear( this.element.querySelector( '.component-calendar-year' ).value )
      this.set( 'date', date )
    } )
  }

  get field () {
    return this.element.querySelector( '.component-calendar-input' )
  }
}

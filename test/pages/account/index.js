'use strict'

import { topsmith, ComponentCalendar, ComponentClock, ComponentDatatable, ComponentHtmlEditor } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageAccount extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/account$/i
  }

  static get settings () {
    return {
      size: 'x2'
    }
  }

  execute () {
    let calendar = topsmith.renderComponent( this.element.querySelector( '#calendar' ), ComponentCalendar )
    calendar.set( 'date', '1984-07-22' )
    calendar.set( 'days', 'D,L,M,M,J,V,S' )

    let clock = topsmith.renderComponent( this.element.querySelector( '#clock' ), ComponentClock )
    setInterval( () => {
      clock.set( 'time', Date().toString() )
    }, 1000 )

    let htmlEditor = topsmith.renderComponent( this.element.querySelector( '#html-editor' ), ComponentHtmlEditor )
    htmlEditor.set( 'text', '<div style="text-align:center">ASD</div>' )

    let datatable = topsmith.renderComponent( this.element.querySelector( '#datatable' ), ComponentDatatable )
    datatable.set( 'columns', {
      c1: {
        name: 'Column 1',
        style: 'position-left',
        sortable: true,
        searchable: true
      },
      c2: {
        name: 'Column 2',
        style: 'position-center',
        sortable: false
      },
      c3: {
        name: 'Column 3',
        style: 'position-right',
        sortable: true,
        searchable: true
      }
    } )

    datatable.set( 'count', 2 )

    datatable.set( 'data', [
      { c1: 1, c2: 2, c3: 3 },
      { c1: 4, c2: 5, c3: 6 },
      { c1: 7, c2: 8, c3: 9 }
    ] )

    // datatable.process( ( index, order, count, search, searchFields ) => {
    //   let data = [
    //     { c1: 1, c2: 2, c3: 3 },
    //     { c1: 4, c2: 5, c3: 6 },
    //     { c1: 7, c2: 8, c3: 9 }
    //   ]

    //   data.sort( ( a, b ) => {
    //     let column = order[ 0 ]
    //     let direction = ( order[ 1 ] === 'asc' ) ? 1 : -1

    //     return ( a[ column ] - b[ column ] ) * direction
    //   } )

    //   data = data.filter( ( value ) => {
    //     if ( search ) {
    //       let match = false
    //       for ( let i = 0; i < searchFields.length; i++ ) {
    //         if ( value[ searchFields[ i ] ].toString().indexOf( search ) !== -1 ) {
    //           match = true
    //         }
    //       }
    //       return match
    //     }
    //     return true
    //   } )

    //   return Promise.resolve( {
    //     recordsFiltered: data.length,
    //     recordsTotal: 10,
    //     data: data.slice( index, index + count )
    //   } )
    // } )
  }
}

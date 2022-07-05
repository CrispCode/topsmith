/* globals document */

'use strict'

import { loop } from '@crispcode/modux'
import { BaseComponent } from './../base-component'

import template from './template.html'
import './styles.scss'

export class ComponentDatatable extends BaseComponent {
  get template () {
    return template
  }

  setup () {
    return {
      label: {
        default: 'Showing %count% of %filtered% records. ( %total% total records )',
        attribute: 'data-label'
      },
      // Used for static data
      data: {
        default: [],
        attribute: 'data-data',
        parse: ( value ) => {
          // String to JSON
          if ( typeof value === 'string' ) {
            value = value.replaceAll( '\'', '"' )
            value = JSON.parse( value )
          }
          return value
        },
        update: () => {
          this._page = 0
          this.refresh()
        }
      },
      search: {
        default: '',
        attribute: 'data-search',
        update: ( value ) => {
          this.element.querySelector( '.component-datatable-header-search' ).value = value
          this._page = 0
          this.refresh()
        }
      },
      count: {
        default: 25,
        attribute: 'data-count',
        init: ( value ) => {
          // String to Integer
          if ( typeof value === 'string' ) {
            value = parseInt( value )
          }
          return value
        },
        update: () => {
          this.refresh()
        }
      },
      order: {
        default: [],
        attribute: 'data-order',
        init: ( value ) => {
          // String to Array
          if ( !Array.isArray( value ) ) {
            value = value.split( ',' )
          }
          return value
        },
        update: () => {
          this.refresh()
        }
      },
      columns: {
        default: {},
        attribute: 'data-columns',
        parse: ( value ) => {
          if ( typeof value === 'string' ) {
            value = value.replaceAll( '\'', '"' )
            value = JSON.parse( value )
          }
          // Array to Object
          if ( Array.isArray( value ) ) {
            let result = {}
            loop( value, ( rows, index ) => {
              if ( typeof rows === 'string' ) {
                result[ index ] = {
                  name: rows,
                  searchable: true,
                  sortable: true
                }
              } else {
                result[ index ] = Object.assign( {}, rows )
              }
            } )
            value = result
          }
          return value
        },
        update: ( value ) => {
          let head = this.element.querySelector( 'thead tr' )
          head.innerHTML = ''

          loop( value, ( column, index ) => {
            let th = document.createElement( 'th' )
            th.setAttribute( 'data-index', index )
            if ( column.headStyle ) {
              th.classList.add( column.headStyle )
            }
            if ( column.sortable ) {
              th.classList.add( 'sortable' )
              th.addEventListener( 'click', () => {
                let classes = th.className.split( ' ' )
                let order = 0
                if ( classes.indexOf( 'sortable-desc' ) !== -1 ) {
                  order = 1
                }
                if ( classes.indexOf( 'sortable-asc' ) !== -1 ) {
                  order = -1
                }

                // Remove the others
                let headers = head.querySelectorAll( 'th' )
                loop( headers, ( header ) => {
                  header.classList.remove( 'sortable-asc' )
                  header.classList.remove( 'sortable-desc' )
                } )

                switch ( order ) {
                  case -1:
                    th.classList.add( 'sortable-desc' )
                    this.set( 'order', [ th.getAttribute( 'data-index' ), 'desc' ] )
                    break
                  case 0:
                  case 1:
                    th.classList.add( 'sortable-asc' )
                    this.set( 'order', [ th.getAttribute( 'data-index' ), 'asc' ] )
                    break
                }
              } )
            }

            th.innerHTML = column.name

            head.appendChild( th )
          } )
        }
      }
    }
  }

  execute () {
    this._page = 0
    this._pages = 10
    this._showing = 0
    this._data = {}

    let butNext = this.element.querySelector( '.component-datatable-footer-next' )
    butNext.addEventListener( 'click', () => {
      if ( butNext.className.split( ' ' ).indexOf( 'disabled' ) !== -1 ) {
        return
      }
      this._page++
      this.refresh()
    } )
    let butPrev = this.element.querySelector( '.component-datatable-footer-prev' )
    butPrev.addEventListener( 'click', () => {
      if ( butPrev.className.split( ' ' ).indexOf( 'disabled' ) !== -1 ) {
        return
      }
      this._page--
      this.refresh()
    } )

    let search = this.element.querySelector( '.component-datatable-header-search' )
    let fSearch = () => {
      this.set( 'search', search.value )
    }
    search.addEventListener( 'change', fSearch )
    search.addEventListener( 'input', fSearch )
  }

  process ( f ) {
    if ( typeof f === 'function' ) {
      this._refreshFunction = f
      this.refresh()
    }
  }

  // This will be rendered for static data
  _refreshFunction ( index, order, count, search, searchFields ) {
    let data = this.get( 'data' )
    let total = data.length

    if ( Array.isArray( order ) && order.length === 2 ) {
      data.sort( ( a, b ) => {
        let column = order[ 0 ]
        let direction = ( order[ 1 ] === 'asc' ) ? 1 : -1

        if ( a[ column ] < b[ column ] ) {
          return -1 * direction
        } else if ( a[ column ] > b[ column ] ) {
          return 1 * direction
        } else {
          return 0
        }
      } )
    }

    data = data.filter( ( value ) => {
      if ( search ) {
        let match = false
        for ( let i = 0; i < searchFields.length; i++ ) {
          if ( value[ searchFields[ i ] ].toString().indexOf( search ) !== -1 ) {
            match = true
          }
        }
        return match
      }
      return true
    } )

    return Promise.resolve( {
      recordsFiltered: data.length,
      recordsTotal: total,
      data: data.slice( index, index + count )
    } )
  }

  refresh () {
    if ( typeof this._refreshFunction === 'function' ) {
      let searchFields = []
      loop( this.get( 'columns' ), ( column, name ) => {
        if ( column.searchable ) {
          searchFields.push( name )
        }
      } )
      this._refreshFunction( this._page * this.get( 'count' ), this.get( 'order' ), this.get( 'count' ), this.get( 'search' ), searchFields )
        .then( ( data ) => {
          this._data = data
          this._pages = Math.ceil( data.recordsFiltered / this.get( 'count' ) ) || 1

          this._buildTable()

          let label = this.get( 'label' )
            .replaceAll( '%count%', this._showing )
            .replaceAll( '%filtered%', data.recordsFiltered )
            .replaceAll( '%total%', data.recordsTotal )
          this.element.querySelector( '.component-datatable-header-label' ).innerHTML = label
        } )
    }
  }

  _buildTable () {
    let body = this.element.querySelector( 'tbody' )
    body.innerHTML = ''
    this._showing = 0

    let data = this._data.data

    loop( data, ( row, irow ) => {
      this._showing = irow + 1
      if ( irow >= this.get( 'count' ) ) {
        return
      }

      let tr = document.createElement( 'tr' )
      tr.setAttribute( 'data-index', irow )

      let columns = this.get( 'columns' )
      if ( Object.keys( columns ).length === 0 ) {
        columns = row
      }

      loop( columns, ( details, icol ) => {
        let td = document.createElement( 'td' )
        td.setAttribute( 'data-index', icol )
        if ( details.style ) {
          td.classList.add( details.style )
        }
        td.innerHTML = row[ icol ]

        tr.appendChild( td )
      } )

      body.appendChild( tr )
    } )

    // Build footer
    if ( this._page + 1 === this._pages ) {
      this.element.querySelector( '.component-datatable-footer-next' ).classList.add( 'disabled' )
    } else {
      this.element.querySelector( '.component-datatable-footer-next' ).classList.remove( 'disabled' )
    }
    this.element.querySelector( '.component-datatable-footer-text' ).innerHTML = ( this._page + 1 ) + ' / ' + this._pages
    if ( this._page === 0 ) {
      this.element.querySelector( '.component-datatable-footer-prev' ).classList.add( 'disabled' )
    } else {
      this.element.querySelector( '.component-datatable-footer-prev' ).classList.remove( 'disabled' )
    }
  }
}

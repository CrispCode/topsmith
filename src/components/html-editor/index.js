/* globals DOMParser, HTMLElement */

'use strict'

import { loop } from '@crispcode/modux'
import { BaseComponent } from './../base-component'

import template from './template.html'
import './styles.scss'

export class ComponentHtmlEditor extends BaseComponent {
  get template () {
    return template
  }

  setup () {
    return {
      name: {
        default: '',
        attribute: 'data-name',
        update: ( value ) => {
          this.element.querySelector( '.component-html-editor-edit' ).setAttribute( 'name', value )
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
            this.element.querySelector( '.component-html-editor-edit' ).setAttribute( 'disabled', '' )
          } else {
            this.element.classList.remove( 'locked' )
            this.element.querySelector( '.component-html-editor-edit' ).removeAttribute( 'disabled', '' )
          }
        }
      },
      text: {
        default: '',
        parse: ( value ) => {
          // HTMLElement to String
          if ( value instanceof HTMLElement ) {
            value = value.outerHTML
          }
          return value
        },
        update: ( value ) => {
          let text = this.element.querySelector( '.component-html-editor-edit' )
          text.value = value

          let view = this.element.querySelector( '.component-html-editor-view' )
          view.innerHTML = ''

          let parser = new DOMParser()
          let errorNode = parser.parseFromString( '<article>' + text.value + '</article>', 'application/xml' ).querySelector( 'parsererror' )
          if ( errorNode ) {
            view.appendChild( errorNode )
          }
          view.innerHTML = view.innerHTML + text.value
        }
      }
    }
  }

  execute () {
    this.element.querySelector( '.component-html-editor-edit' ).addEventListener( 'input', () => {
      this.set( 'text', this.element.querySelector( '.component-html-editor-edit' ).value )
    } )
    this.element.querySelector( '.component-html-editor-edit' ).addEventListener( 'change', () => {
      this.set( 'text', this.element.querySelector( '.component-html-editor-edit' ).value )
    } )

    loop( this.element.querySelectorAll( '.component-html-editor-toolbar-button' ), ( button ) => {
      button.addEventListener( 'click', () => {
        // Remove active class from others
        loop( this.element.querySelectorAll( '.component-html-editor-toolbar-button' ), ( otherButton ) => {
          otherButton.classList.remove( 'active' )
        } )
        button.classList.add( 'active' )
      } )
    } )

    this.element.querySelector( '.component-html-editor-toolbar-button-edit' ).addEventListener( 'click', () => {
      this.element.querySelector( '.component-html-editor-edit' ).classList.remove( 'hide' )
      this.element.querySelector( '.component-html-editor-view' ).classList.add( 'hide' )
    } )

    this.element.querySelector( '.component-html-editor-toolbar-button-view' ).addEventListener( 'click', () => {
      this.element.querySelector( '.component-html-editor-edit' ).classList.add( 'hide' )
      this.element.querySelector( '.component-html-editor-view' ).classList.remove( 'hide' )
    } )
  }
}

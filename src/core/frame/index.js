'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

import { Side } from './../side'
import { Header } from './../header'
import { Main } from './../main'
import { Footer } from './../footer'

export class Frame extends Component {
  get template () {
    return template
  }

  addComponent ( name, code ) {
    this.module.addDependency( name, code )
    this.element.querySelector( '.topsmith-' + name ).innerHTML = ''
    this.element.querySelector( '.topsmith-' + name ).setAttribute( 'data-modux-component', name )
  }

  execute () {
    this.addComponent( 'side', Side )
    this.addComponent( 'header', Header )
    this.addComponent( 'main', Main )
    this.addComponent( 'footer', Footer )
  }
}

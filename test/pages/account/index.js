'use strict'

import { topsmith } from './../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageAccount extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/$/i
  }

  static get settings () {
    return {
      size: 'x2'
    }
  }
}

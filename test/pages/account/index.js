'use strict'

import { topsmith } from './../../../src/index.js'

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
      size: 'x3'
    }
  }
}

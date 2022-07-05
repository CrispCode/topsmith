'use strict'

import { topsmith, ComponentHtmlEditor } from './../../../../src/index.js'

import template from './template.html'
import './styles.scss'

export class PageHtmlEditor extends topsmith.classes.Page {
  get template () {
    return template
  }

  static get url () {
    return /^\/components\/html-editor$/i
  }

  static get settings () {
    return {
      size: 'x3'
    }
  }

  execute () {
    topsmith.registerComponent( ComponentHtmlEditor )
  }
}

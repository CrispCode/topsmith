'use strict'

import { Component } from '@crispcode/modux'

export class Page extends Component {
  static get url () {
    return /^\/$/i
  }

  static get settings () {
    return {
      css: '',
      size: 'x3'
    }
  }
}

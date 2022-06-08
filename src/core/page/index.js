'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class ComponentPage extends Component {
  get template () {
    return template
  }

  static get url () {
    /**
     * Explaining :  ^   (.*:\/)?   \/   ([^\/\?]+)   (\/[^\?]*)?   (\?[^#]*)?   (#.*)?   $
     *                   protocol/   /    hostname       path       parameters    hash
     */

    return /^(.*:\/)?\/([^\\/\\?]+)\/?(\?[^#]*)?(#.*)?$/i
  }
}

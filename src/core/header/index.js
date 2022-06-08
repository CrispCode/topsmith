'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './styles.scss'

export class Header extends Component {
  get template () {
    return template
  }
}

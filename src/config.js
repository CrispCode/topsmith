'use strict'

import { ComponentPage } from './core/page'

export let config = {
  structure: {
    side: {
      logo: {
        image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzY4cHgiIGhlaWdodD0iNDQ4cHgiIHZpZXdCb3g9IjAgMCA3NjggNDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA2MS4yICg4OTY1MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+aWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJpY29uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cmVjdCBpZD0iYmxvY2stYmxhY2siIGZpbGw9IiMwMDAwMDAiIHg9IjM4NCIgeT0iMCIgd2lkdGg9IjM4NCIgaGVpZ2h0PSI0NDgiPjwvcmVjdD4KICAgICAgICA8cmVjdCBpZD0iYmxvY2std2hpdGUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIzODQiIGhlaWdodD0iNDQ4Ij48L3JlY3Q+CiAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkM2NEQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU0NC4wMDAwMDAsIDIyNC4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTU0NC4wMDAwMDAsIC0yMjQuMDAwMDAwKSAiIHBvaW50cz0iMzg0IDY0IDM4NCAzODQgNzA0IDM4NCA3MDQgMzIwIDQ0OCAzMjAgNDQ4IDEyOCA3MDQgMTI4IDcwNCA2NCI+PC9wb2x5Z29uPgogICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjY0IDY0IDY0IDM4NCAzODQgMzg0IDM4NCAzMjAgMTI4IDMyMCAxMjggMTI4IDM4NCAxMjggMzg0IDY0Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg==',
        url: '/'
      },
      navigation: {
        'home': {
          order: 1,
          icon: 'home',
          tooltip: 'home',
          url: '/',
          external: false,
          target: null,
          match: /^(.*:\/)?\/([^\\/\\?]+)\/?(\?[^#]*)?(#.*)?$/i,
          active: false
        }
      },
      menu: {
        'notifications': {
          order: 1,
          icon: 'notifications',
          tooltip: 'notifications',
          url: '#notifications',
          external: false,
          target: null,
          match: /^(.*:\/)?\/([^\\/\\?]+)(\/[^?]*)?(\?[^#]*)?#notifications$/i,
          active: false
        },
        'account_circle': {
          order: 2,
          icon: 'account_circle',
          tooltip: 'account circle',
          url: '/account',
          external: false,
          target: null,
          match: null,
          active: false
        }
      }
    },
    main: {
      pages: [
        ComponentPage
      ]
    }
  }
}

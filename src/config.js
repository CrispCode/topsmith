'use strict'

export let defaults = {
  side: {
    logo: {
      image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzY4cHgiIGhlaWdodD0iNDQ4cHgiIHZpZXdCb3g9IjAgMCA3NjggNDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA2MS4yICg4OTY1MykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+aWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJpY29uIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cmVjdCBpZD0iYmxvY2stYmxhY2siIGZpbGw9IiMwMDAwMDAiIHg9IjM4NCIgeT0iMCIgd2lkdGg9IjM4NCIgaGVpZ2h0PSI0NDgiPjwvcmVjdD4KICAgICAgICA8cmVjdCBpZD0iYmxvY2std2hpdGUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIzODQiIGhlaWdodD0iNDQ4Ij48L3JlY3Q+CiAgICAgICAgPHBvbHlnb24gaWQ9IlBhdGgiIGZpbGw9IiNGRkM2NEQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU0NC4wMDAwMDAsIDIyNC4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTU0NC4wMDAwMDAsIC0yMjQuMDAwMDAwKSAiIHBvaW50cz0iMzg0IDY0IDM4NCAzODQgNzA0IDM4NCA3MDQgMzIwIDQ0OCAzMjAgNDQ4IDEyOCA3MDQgMTI4IDcwNCA2NCI+PC9wb2x5Z29uPgogICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoIiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjY0IDY0IDY0IDM4NCAzODQgMzg0IDM4NCAzMjAgMTI4IDMyMCAxMjggMTI4IDM4NCAxMjggMzg0IDY0Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg==',
      url: '/'
    },
    navigation: {
      'home': {
        order: 1, // Order in the list
        icon: 'home', // Google icon to use
        tooltip: 'home', // The tooltip
        url: '/', // Url to redirect to OR null
        external: false, // If the url points to external url
        target: null, // Anchor target
        match: /^\/$/i, // Set active if url matches pattern OR null
        section: null // Opens the section name in the section part of side
      },
      'home3': {
        order: 1,
        icon: 'home',
        tooltip: 'home',
        url: '/a/a',
        external: false,
        target: null,
        match: /^\/$/i,
        section: null
      },
      'projects': {
        order: 1,
        icon: 'grid_view',
        tooltip: 'projects',
        url: null,
        external: false,
        target: null,
        match: null,
        section: 'projects'
      }
    },
    menu: {
      'account_circle': {
        order: 1,
        icon: 'account_circle',
        tooltip: 'account circle',
        url: '#account',
        external: false,
        target: null,
        match: null,
        section: null
      }
    },
    sections: {}
  },
  header: {
    logo: {
      image: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjI0MHB4IiBoZWlnaHQ9Ijg5NnB4IiB2aWV3Qm94PSIwIDAgMjI0MCA4OTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYxLjIgKDg5NjUzKSAtIGh0dHBzOi8vc2tldGNoLmNvbSAtLT4KICAgIDx0aXRsZT5sb2dvIHNxdWFyZSB3aGl0ZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJsb2dvLXNxdWFyZS13aGl0ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJsb2NrL3llbGxvdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTEyLjAwMDAwMCwgNTEyLjAwMDAwMCkiIGZpbGw9IiNGRkM2NEQiPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iYmxvY2siIHBvaW50cz0iLTEuMTM2ODY4MzhlLTEzIC0yLjg0MjE3MDk0ZS0xNCAtMS4xMzY4NjgzOGUtMTMgMzIwIDMyMCAzMjAgMzIwIC0yLjg0MjE3MDk0ZS0xNCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iRS9ibGFjayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQwOC4wMDAwMDAsIDUxMi4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkUiIHBvaW50cz0iMCAzMjAgMCAwIDMyMCAwIDMyMCA2NCA2NCA2NCA2NCAxMjggMzIwIDEyOCAzMjAgMTkyIDY0IDE5MiA2NCAyNTYgMzIwIDI1NiAzMjAgMzIwIj48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJEL2JsYWNrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NjAuMDAwMDAwLCA1MTIuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxnIGlkPSJEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgLTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aC01IiBwb2ludHM9IjAgLTIuODQyMTcwOTRlLTE0IDAgMzIwIDI1NiAzMjAgMjU2IDI1NiA2NCAyNTYgNjQgNjQgMjU2IDY0IDI1NiAtMi44NDIxNzA5NGUtMTQiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTYiIHBvaW50cz0iMzIwIDI1NiAyNTYgMjU2IDI1NiA2NCAzMjAgNjQiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iQy9ibGFjayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjQuMDAwMDAwLCA1MTIuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJDIiBwb2ludHM9Ii01LjY4NDM0MTg5ZS0xNCAwIDMyMCAwIDMyMCA2NCA2NCA2NCA2NCAyNTYgMzIwIDI1NiAzMjAgMzIwIC01LjY4NDM0MTg5ZS0xNCAzMjAiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9IlAvYmxhY2siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4NTYuMDAwMDAwLCA2NC4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlAiIHBvaW50cz0iMCAzMjAgMCAwIDMyMCAwIDMyMCAxOTIgNjQgMTkyIDY0IDEyOCAyNTYgMTI4IDI1NiA2NCA2NCA2NCA2NCAzMjAiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICAgICAgPGcgaWQ9IlMvYmxhY2siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0MDguMDAwMDAwLCA2NC4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlMiIHBvaW50cz0iMzIwIDAgNCAwIDQgMTkyIDI1NiAxOTIgMjU2IDI1NiAwIDI1NiA0IDMyMCAzMjAgMzIwIDMyMCAxMjggNjQgMTI4IDY0IDY0IDMyMCA2NCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iSS9ibGFjayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTYwLjAwMDAwMCwgNjQuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJJIiBwb2ludHM9Ii0yLjg0MjE3MDk0ZS0xNCAwIDMyMCAwIDMyMCA2NCAxOTIgNjQgMTkyIDI1NiAzMjAgMjU2IDMyMCAzMjAgLTIuODQyMTcwOTRlLTE0IDMyMCAtMi44NDIxNzA5NGUtMTQgMjU2IDEyOCAyNTYgMTI4IDY0IC0yLjg0MjE3MDk0ZS0xNCA2NCI+PC9wb2x5Z29uPgogICAgICAgIDwvZz4KICAgICAgICA8ZyBpZD0iUi9ibGFjayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTEyLjAwMDAwMCwgNjQuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxnIGlkPSJSIj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTIiIHBvaW50cz0iMCAwIDI1NiAwIDI1NiA2NCA2NCA2NCA2NCAxMjggMjU2IDEyOCAyNTYgMTkyIDY0IDE5MiA2NCAzMjAgMCAzMjAiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTMiIHBvaW50cz0iMjU2IDY0IDMyMCA2NCAzMjAgMTI4IDI1NiAxMjgiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTQiIHBvaW50cz0iMjU2IDE5MiAzMjAgMTkyIDMyMCAzMjAgMjU2IDMyMCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJDL2JsYWNrIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NC4wMDAwMDAsIDY0LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8cG9seWdvbiBpZD0iQyIgcG9pbnRzPSItNS42ODQzNDE4OWUtMTQgMCAzMjAgMCAzMjAgNjQgNjQgNjQgNjQgMjU2IDMyMCAyNTYgMzIwIDMyMCAtNS42ODQzNDE4OWUtMTQgMzIwIj48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSJibG9jay9ibGFjayIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg1Ni4wMDAwMDAsIDc2OC4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9ImJsb2NrIiBwb2ludHM9Ii0xLjEzNjg2ODM4ZS0xMyAtNS42ODQzNDE4OWUtMTUgLTEuMTM2ODY4MzhlLTEzIDY0IDMyMCA2NCAzMjAgLTUuNjg0MzQxODllLTE1Ij48L3BvbHlnb24+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=',
      url: '/'
    },
    title: 'TOPSMITH',
    description: 'An easy way to build your administration pages',
    buttons: {
      'notifications': {
        order: 1,
        icon: 'notifications',
        tooltip: 'notifications',
        url: '/notifications',
        external: false,
        target: null,
        match: /^\/notifications$/i
      },
      'logs': {
        order: 2,
        icon: 'browse_activity',
        tooltip: 'logs',
        url: '/logs',
        external: false,
        target: null,
        match: /^\/logs$/i
      }
    }
  },
  pages: {},
  footer: '&copy; 2022 CrispCode S.R.L. All rights reserved.'
}

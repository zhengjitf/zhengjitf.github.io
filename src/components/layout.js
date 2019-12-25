import React from "react"
import { Global, css } from '@emotion/core'

import globalCss from '../styles/global'
import { mq } from '../styles/mq'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { children, header, aside } = this.props

    return (
      <div
      >
        <Global
          styles={globalCss}
        />
        <header>
          {header}
        </header>
        <div
          className="container"
          css={css`
            margin-top: 50px;
            margin-bottom: 50px;
            display: flex;
          `}
        >
          {aside}
          <main
            css={css`
              flex: 1;
              ${mq({
                padding: ['0 10px', !!aside ? '0 50px' : '0 10px'],
              })};
            `}
          >
            {children}
          </main>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default Layout

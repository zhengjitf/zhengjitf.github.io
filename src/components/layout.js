import React from "react"
import { Global, css } from '@emotion/core'

import globalCss from '../styles/global'
import { mq } from '../styles/mq'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { children, header, aside, noFooter } = this.props

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
          style={{
            paddingTop: 50,
            paddingBottom: 50,
            display: 'flex',
            minHeight: 'calc(100vh - 120px - 300px)',
          }}
        >
          {aside}
          <main
            css={css`
              flex: 1;
              max-width: 100%;
              ${mq({
                padding: ['0 10px', !!aside ? '0 50px' : '0 10px'],
              })};
            `}
          >
            {children}
          </main>
        </div>
        <footer>
          {noFooter || <Footer />}
        </footer>
      </div>
    )
  }
}

export default Layout

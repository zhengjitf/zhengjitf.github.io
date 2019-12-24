import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'

import globalCss from '../styles/global'
import { mq } from '../styles/mq'
import { rhythm, scale } from "../utils/typography"
import Header from './header'
import Aside from './aside'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { location, title, children, pageData } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath

    return (
      <div
      >
        <Global
          styles={globalCss}
        />
        <header>
          <Header location={location} pageData={pageData} />
        </header>
        <div
          className="container"
          style={{ marginTop: 50, marginBottom: 50 }}
        >
          {
            isRootPath && (
              <aside
                css={css`
                  ${mq({
                    display: ['none', 'block'],
                  })}
                  float: left;
                  width: 230px;
                `}
              >
                <Aside/>
              </aside>
            )
          }
          <main
            css={css`
              ${mq({
                padding: ['0 20px', isRootPath ? '70px' : 0],
                'border-left': [0, isRootPath ? '1px solid #d9d9d9' : 0],
                width: ['100%', isRootPath ? 'calc(100% - 230px)' : '770px'],
              })}
              float: ${isRootPath ? 'left' : 'none'};
              max-width: 100%;
              margin: 0 auto;
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

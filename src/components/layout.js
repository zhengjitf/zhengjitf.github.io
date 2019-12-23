import React from "react"
import { Link } from "gatsby"
import { Global, css } from '@emotion/core'

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
          styles={css`
            body {
              font-family: Lora,sans-serif;
              font-size: 20px;
              color: #25333e;
            }
            img {
              margin: 0;
            }
            ul, li {
              list-style: none;
            }
            a, h1, h2, h3, h4, h5, h6 {
              font-family: Montserrat,sans-serif;
            }
            a {
              box-shadow: none;
              color: inherit;
            }
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
            }
            h4 {
              font-size: 24px;
              letter-spacing: -.3px;
            }
            .container {
              margin: auto;
              padding: 0 15px;

              &:before, &:after {
                content: '';
                display: table;
              }
              &:after {
                clear: both;
              }
  
              @media (min-width: 768px) {
                width: 750px;
              }
              @media (min-width: 992px) {
                width: 970px;
              }
              @media (min-width: 1200px) {
                width: 1170px;
              }
            }

            blockquote {
              line-height: 1.6;
              font-style: italic;
              border-color: #d0414e;
              color: inherit;
            }

            .post-container {
              a {
                color: #d0414e;
                font-family: Lora,sans-serif;
                position: relative;
                text-decoration: none;
                white-space: nowrap;
              }
            }
          `}
        >
          
        </Global>
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
              float: ${isRootPath ? 'left' : 'none'};
              padding-left: ${isRootPath ? '70px' : 0};
              width: ${isRootPath ? 'calc(100% - 230px)' : '770px'};
              max-width: 100%;
              border-left: ${isRootPath ? '1px solid #d9d9d9' : 0};
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

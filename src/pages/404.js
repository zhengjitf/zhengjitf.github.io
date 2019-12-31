import React from 'react'
import { graphql, withPrefix, Link } from 'gatsby'
import { css, Global } from '@emotion/core'

import globalCss from '../styles/global'
import SEO from '../components/seo'
import { mq } from '../styles/mq'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div
        css={css`
          min-height: 100vh;
          background: #d0414e;
          ${mq({
            padding: ['50px', '50px 15px'],
          })};
        `}
      >
        <Global
          styles={globalCss}
        />
        <SEO title="404: Not Found" />
        <div
          className="container"
          css={css`
            position: relative;
            height: calc(100vh - 100px);
            min-height: 300px;
            overflow: hidden;
            text-align: center;
            box-shadow: 0 0 30px 0 rgba(0,0,0,.08);
            color: #d0414e;
            background: #fff;
          `}
        >
          <h1
            css={css`
              position: absolute;
              left: 50%;
              top: 40%;
              transform: translate(-50%, -50%);
              margin: 0;
              ${mq({
                fontSize: ['100px', '200px'],
              })};
              background: url(${withPrefix('/icon.png')}) center no-repeat;
              background-size: 400px 400px;
              -webkit-background-clip: text;
              background-clip: text;
              color: rgba(208, 65, 78, 0.9);
            `}>
            404
          </h1>
          <div
            css={css`
              position: absolute;
              bottom: 60px;
              left: 0;
              right: 0;
              text-align: center;
            `}
          >
            <Link
              css={css`
                margin-left: -10px;
                display: inline-block;
                height: 40px;
                line-height: 40px;
                text-align: center;
                width: 200px;
                color: #fff;
                background: #d0414e;
                box-shadow: 6px 6px 0px 0 rgba(0,0,0,1);
                text-transform: uppercase;
                cursor: pointer;
                &:hover {
                  box-shadow: 6px 6px 5px 0 rgba(0,0,0,1);
                }
              `}
              to="/"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

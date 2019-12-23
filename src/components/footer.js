import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import Socials from '../components/socials'

export default () => {
  return (
    <div
      css={css`
        padding: 60px 0;
        background: #25333f;
      `}
    >
      <div className="container">
        <div
          css={css`
            float: left;
            color: #fff;
            font-size: 16px;
            a {
              margin-right: 30px;
            }
          `}
        >
          <Link>Blog</Link>
          <Link>About</Link>
        </div>
        <div
          css={css`
            float: right;
          `}
        >
          <Socials></Socials>
        </div>
      </div>
    </div>
  )
}
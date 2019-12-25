import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import Socials from './socials'
import { mq } from '../styles/mq'

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
            a + a {
              margin-left: 30px;
            }
            ${mq({
              width: ['100%', 'auto'],
              textAlign: ['center', 'inherit'],
              marginBottom: ['10px', 0],
            })}
          `}
        >
          <Link to="/">Blog</Link>
          <Link to="/">About</Link>
        </div>
        <div
          css={css`
            float: right;
            ${mq({
              width: ['100%', 'auto'],
            })}
          `}
        >
          <Socials
            css={css`
              justify-content: center;
            `}/>
        </div>
      </div>
    </div>
  )
}
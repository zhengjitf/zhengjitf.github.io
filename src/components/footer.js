import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import Socials from './socials'
import { mq } from '../styles/mq'

export default () => {
  return (
    <div
      css={css`
        background: #25333f;
      `}
    >
      <div 
        className="container"
        css={css`
          height: 120px;
          display: flex;
          align-items: center;
          ${mq({
            flexDirection: ['column', 'row'],
            justifyContent: ['center', 'space-between'],
          })};
        `}
      >
        <div
          css={css`
            flex: none;
            color: #fff;
            font-size: 16px;
            a + a {
              margin-left: 30px;
            }
            ${mq({
              marginBottom: [10, 0],
            })};
          `}
        >
          {/* <Link to="/">Blog</Link>
          <Link to="/">About</Link> */}
        </div>
        <div
          css={css`
            flex: none;
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
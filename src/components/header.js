import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

export default (props) => {
  return (
    <div
      css={css`
        height: 300px;
        width: 100%;
        background: url(/header-bg.png);
        background-size: cover;
        color: #fff;
        padding-top: 40px;
        position: relative;
      `}
    >
      <div className="container">
        <div
          css={css`
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
          `}
        >
          <h1
            css={css`
              font-size: 42px;
              font-weight: 700;
              margin: 0;
              letter-spacing: -.5px;
            `}>
              <Link to="/">zhengjitf</Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

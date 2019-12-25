import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { tag as tagCss } from '../styles/common'

export default (props) => {
  const Wrapper = props.link ? Link : 'div'
  const linkableCss = props.link ? css`
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transform: scaleX(.18);
      border-radius: 30px;
      background: #fff;
      opacity: 0;
      transition: opacity 450ms cubic-bezier(.7,0,.3,1), transform .3s cubic-bezier(.7,0,.3,1);
    }

    &:hover:before {
      transform: scaleX(1);
      opacity: 1;
    }
    &:hover {
      color: #d0414e;
    }
  ` : ''

  return (
    <Wrapper 
      css={css`
        ${tagCss};
        ${linkableCss};
      `} 
      to={`/tag/${props.label}`}
    >
      <span
        css={css`
          position: relative;
        `}>{ props.label }</span>
    </Wrapper>
  )
}
import React, { useState } from 'react'
import { Link, withPrefix } from 'gatsby'
import { css } from '@emotion/core'

import { mq } from '../styles/mq'
import SearchModal from './searchModal'

const hoverRippleCss = ({ width, height }) => css`
  &:before, &:after {
    content: '';
    position: absolute;
    width: ${width};
    height: ${height};
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    transform: scale(0) translate(-50%,-50%);
    background: rgba(0, 0, 0, .09);
  }
  &:before {
    transition: all 250ms cubic-bezier(.09,.05,0,.39);
  }
  &:after {
    transition: all 390ms cubic-bezier(.09,.05,0,.39);
    transition-delay: 150ms;
  }
  &:hover:before, &:hover:after {
    transform: scale(1.5) translate(-50%,-50%);
}
`

export default (props) => {
  const { withBack } = props

  const [searchModalVisible, setSearchModalVisible] = useState(false)

  return (
    <div
      css={css`
        height: 300px;
        width: 100%;
        background: url(${withPrefix('/header-bg.png')});
        background-size: cover;
        color: #fff;
        padding-top: 40px;
        position: relative;
      `}
    >
      <SearchModal 
        visible={searchModalVisible}
        onVisibleChange={setSearchModalVisible}
      />
      <div 
        className="container"
        css={css`
          overflow: hidden;
        `}
      >
        {
          withBack && (
            <Link
              to="/"
              css={css`
                position: relative;
                display: flex;
                align-items: center;
                z-index: 2;
                overflow: hidden;
                float: left;
                background: rgba(37,51,62,.5);
                color: rgba(255,255,255,.7);
                cursor: pointer;
                font-weight: 300;
                font-size: 14px;

                ${mq({
                  borderRadius: ['50%', '30px'],
                  width: ['46px', 'auto'],
                  height: ['46px', 'auto'],
                  padding: ['0', '10px 30px 10px 20px'],
                  justifyContent: ['center', 'normal'],
                })};

                ${hoverRippleCss({width: '200px', height: '200px'})};
              `}
              >
              <img style={{ width: 25, height: 25 }} src={withPrefix('/arrow-left.svg')} alt=""/>
              <span
                css={css`
                  ${mq({
                    display: ['none', 'inline'],
                  })}
                `}>
                BACK
              </span>
            </Link>
          )
        }
      
        <div css={css`float: right;`}>
          <div 
            className="nav-wrapper"
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <div
              css={css`
                display: inline-block;
                position: relative;
                font-weight: 200;
                color: rgba(255,255,255,.7);
                padding: 10px 14px 10px 45px;
                width: 200px;
                text-align: left;
                background: rgba(37,51,62,.5);
                cursor: pointer;
                overflow: hidden;
                z-index: 2;
                border-radius: 30px;
                font-family: Montserrat,sans-serif;
                font-size: 14px;
                letter-spacing: .7px;

                &:hover img {
                  left: calc(100% - 36px);
                }

                ${hoverRippleCss({width: '200px', height: '200px'})};
              `}
              onClick={() => setSearchModalVisible(true)}
            >
              <img 
                src={withPrefix('/search-icon.png')}
                alt=""
                css={css`
                  position: absolute;
                  left: 15px;
                  transition: all .3s cubic-bezier(.7,0,.3,1);
                `}
              />
              <span>Search blog</span>
            </div>
          </div>
        </div>
        { props.children }
      </div>
    </div>
  )
}

import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'

import Socials from './socials'

export default (props) => {
  const { location, pageData } = props
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let tags
  if (pageData) {
    tags = (pageData.post.frontmatter.tag || '').split(',').filter(Boolean)
  } 

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const author = site.siteMetadata.author

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
        {
          !isRootPath && (
            <Link
              to="/"
              css={css`
                float: left;
                background: rgba(37,51,62,.5);
                color: rgba(255,255,255,.7);
                cursor: pointer;
                position: relative;
                overflow: hidden;
                font-weight: 300;
                z-index: 2;
                padding: 11px 30px 9px 20px;
                font-size: 14px;
                border-radius: 30px;
                display: flex;
                align-items: center;
              `}
              ><img style={{ width: 25, height: 25 }} src="/arrow-left.svg" alt=""/>BACK</Link>
          )
        }
      
        <div css={css`float: right;`}>
          <navigation>
            <div 
              className="nav-wrapper"
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <button
                css={css`
                  text-transform: none;
                  font-weight: 200;
                  color: rgba(255,255,255,.7);
                  padding: 11px 14px 9px 45px;
                  width: 200px;
                  text-align: left;
                  background: rgba(37,51,62,.5);
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  z-index: 2;
                  border-radius: 30px;
                  font-family: Montserrat,sans-serif;
                  font-size: 14px;
                  letter-spacing: .7px;
                  border: 0;
                  text-decoration: none;
                  display: inline-block;
                  vertical-align: middle;
                  -webkit-appearance: none;
                  outline: 0!important;

                  &:hover img {
                    left: calc(100% - 36px);
                  }
                  &:after {
                    transition: all 250ms cubic-bezier(.09,.05,0,.39);
                    background: rgba(0,0,0,.09);
                  }
                  &:hover:after {
                    transform: scale(1.5) translate(-50%,-50%);
                  }
                `}
              >
                <img 
                  src="/search-icon.png" 
                  alt=""
                  css={css`
                    position: absolute;
                    left: 15px;
                    transition: all .3s cubic-bezier(.7,0,.3,1);
                  `}
                />
                <span>Search blog</span>
              </button>
              <button
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 10px;
                  width: 46px;
                  height: 46px;
                  border-radius: 50%;
                  background: rgba(37,51,62,.5);
                  border: 0;
                  -webkit-appearance: none;
                  outline: 0!important;
                  vertical-align: middle;
                  cursor: pointer;
                `}>
                <img style={{width: 20, height: 20}} src="/menu.svg" alt=""/>
              </button>
            </div>
          </navigation>
        </div>
        {
          isRootPath && (
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
                <Link to="/">{author}</Link>
              </h1>
              <div style={{marginTop: 20}}>
                <Socials></Socials>
              </div>
            </div>
          )
        }

        {
          !isRootPath && (
            <div
              css={css`
                margin-top: 60px;
                text-align: center;
              `}
            >
              {
                tags.map(tag => {
                  return (
                    <Link 
                      css={css`
                        border-radius: 28px;
                        background: #d0414e;
                        border: 2px solid #d0414e;
                        text-decoration: none!important;
                        display: inline-block;
                        padding: 0 15px;
                        position: relative;
                        overflow: hidden;
                        vertical-align: middle;
                        z-index: 5;
                        color: #fff;
                        text-transform: uppercase;
                        font-size: 14px;
                      `}
                    >
                      {tag}
                    </Link>
                  )
                })
              }
              <h1
                css={css`
                  line-height: 1.33;
                  letter-spacing: -.6px;
                  margin: 30px 0 18px;
                  font-size: 42px;
                `}>
                { pageData.post.frontmatter.title }
              </h1>
              <div
                css={css`
                  color: #a9afb3;
                  font-family: Montserrat,sans-serif;
                  font-weight: 200;
                  font-size: 15px;
                `}>
                { pageData.post.frontmatter.date }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

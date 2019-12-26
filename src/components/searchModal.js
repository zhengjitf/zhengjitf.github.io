import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { css } from '@emotion/core'

import { mq } from '../styles/mq'

export default (props) => {
  const { visible, onVisibleChange } = props
  const [keyword, setKeyword] = useState('')

  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              tags
            }
          }
        }
      }
    }
  `)

  const allPosts = allMarkdownRemark.edges.map(({ node }) => {
    const {
      title,
      description,
      date,
      tags,
    } = node.frontmatter

    return {
      title,
      description,
      date,
      tags,
      path: '/post' + node.fields.slug,
    }
  })
  
  const matchedPosts = allPosts.filter(post => {
    const trimKeyword = (keyword || '').trim()
    if (!trimKeyword) {
      return false
    }
    return post.title.toLowerCase().indexOf(trimKeyword.toLowerCase()) !== -1
  })

  useEffect(() => {
    console.log('visible', visible)
    if (visible) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'initial'
    }

    return () => {
      document.documentElement.style.overflow = 'initial'
    }
  }, [visible])

  console.log('-----', allPosts, matchedPosts)

  return (
    <div
      css={css`
        position: fixed;
        z-index: 1000;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transform: scale(1);
        background: rgba(255,255,255,.95);
        visibility: hidden;
        opacity: 0;
        transform: scale(.5);
        transition: all 200ms;
        color: #25333e;

        ${mq({
          padding: ['30px 0', '80px 0'],
        })};

        ${
          visible ? 
            css`
              visibility: visible;
              opacity: 1;
              transform: scale(1);
            ` : 
            ''
        };
      `}
    >
      <div 
        className="container"
        css={css`
          height: 100%;
          position: relative;
        `}
      >
        <div
          css={css`
            right: 15px;
            opacity: 0.6;
            cursor: pointer;
            transition: all 200ms;
            text-align: center;
            margin-bottom: 20px;
            
            ${mq({
              position: ['static', 'absolute'],
            })};

            &:hover {
              opacity: 1;
              transform: scale(1.1);
            }
          `}>
          <img
            css={css`
              width: 35px;
              height: 35px;
            `}
            src="/close.svg" 
            alt=""
            onClick={() => onVisibleChange(false)}
          />
        </div>
        <div
          className="input-wrapper"
          css={css`
            height: 50px;
            display: flex;
            align-items: center;
          `}
        >
          <img
            css={css`
              width: 40px;
              height: 40px;
            `}
            src="/search-icon-black.png"
            alt=""/>
          <input 
            type="text"
            css={css`
              margin-left: 30px;
              outline: none;
              border: none;
              background: transparent;
              flex: 1;
              height: 38px;
              font-size: 24px;
            `}
            onChange={(e) => {setKeyword(e.target.value)}}
          />
        </div>
        <div
          className="search-results"
          css={css`
            ${mq({
              width: ['100%', '770px'],
              margin: '0 auto',
              padding: ['30px 0', '80px 0'],
            })};
            height: calc(100% - 50px);
            overflow: auto;
          `}>
          {
            matchedPosts.map(post => {
              return (
                <div 
                  key={post.title} 
                  className="result"
                  css={css`
                    margin-bottom: 60px;
                  `}
                >
                  <Link
                    css={css`
                      transition: all 150ms ease-in;
                      font-size: 30px;
                      font-weight: 600;
                      &:hover {
                        color: #a9afb3;
                      }
                    `}
                    onClick={() => onVisibleChange(false)}
                    to={post.path}
                  >
                    { post.title }
                  </Link>
                  <p 
                    css={css`
                      font-family: Lora,sans-serif;
                      font-size: 20px;
                    `}>
                    { post.description }
                  </p>
                </div>
              )
            })
          }
          {
            matchedPosts.length === 0 && (
              <div
                css={css`color: grey;`}
              >
                <div
                  css={css`
                    font-size: 30px;
                  `}>
                  No results
                </div>
                <p>Maybe you should try another words...</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import {css} from '@emotion/core'

import { mq } from '../styles/mq'
import Tag from './tag'
import { postTitle as postTitleCss } from '../styles/common'

export default (props) => {
  const posts = props.list || [];

  return (
    <div>
      {posts.map(post => {
        return (
          <article
            key={post.path}
            css={css`
              padding: 50px 0;
              border-top: solid 1px #d9d9d9;
              &:first-of-type {
                padding-top: 0;
                border: 0;
              }
            `}
          >
            <header>
              <div 
                className="post-data"
                css={css`
                  ${mq({
                    display: ['block', 'flex'],
                  })};
                  align-items: center;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-wrap: wrap;
                    a {
                      margin-top: 5px;
                      margin-bottom: 5px;
                    }
                  `}>
                  {
                    post.tags.map(tag => {
                      return (
                        <Tag key={tag} label={tag} link />
                      )
                    })
                  }
                </div>
                <span
                  css={css`
                    ${mq({
                      marginLeft: [0, 20],
                    })};
                    color: #a9afb3;
                    font-size: 16px;
                  `}
                >
                  {post.date}
                </span>
              </div>
              <h3
                style={{
                  margin: '20px 0',
                }}
              >
                <Link 
                  css={postTitleCss} 
                  to={post.path}
                >
                  {post.title}
                </Link>
              </h3>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.description,
                }}
              />
            </section>
            <Link
              css={css`
                position: relative;
                color: #1464be;
                font-size: 0.8em;
                &:after {
                  content: '';
                  position: absolute;
                  left: 0;
                  background: #1464be;
                  right: 0;
                  bottom: -2px;
                  height: 2px;
                  transition: all .3s cubic-bezier(.7,0,.3,1);
                }
                &:hover:after {
                  transform: scaleX(0);
                }
              `}
              to={post.path}
            >
              阅读全文
            </Link >
          </article>
        )
      })}
    </div>
  )
}

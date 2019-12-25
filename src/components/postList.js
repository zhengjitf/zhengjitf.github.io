import React from 'react'
import { Link } from 'gatsby'
import {css} from '@emotion/core'

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
                  display: flex;
                  align-items: center;
                `}
              >
                {
                  post.tags.map(tag => {
                    return (
                      <Tag key={tag} label={tag} link />
                    )
                  })
                }
                <span
                  css={css`
                    margin-left: 20px;
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
          </article>
        )
      })}
    </div>
  )
}

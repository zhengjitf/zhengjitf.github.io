import React from 'react'
import { css } from '@emotion/core'

import { mq } from '../styles/mq'
import Layout from '../components/layout'
import PostList from '../components/postList'
import HeaderWrapper from '../components/headerWrapper'
import Tag from '../components/tag'

export default ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark

  const posts = edges.map(({ node }) => {
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

  const header = (
    <HeaderWrapper withBack>
      <div
        css={css`
          margin-top: 60px;
          text-align: center;
        `}
      >
        <Tag label='TAG' />
        <h1
          css={css`
            line-height: 1.33;
            letter-spacing: -.6px;
            margin: 30px 0 18px;
            ${mq({
              fontSize: ['32px', '42px'],
            })};
          `}>
          { tag }
        </h1>
        <div
          css={css`
            color: #a9afb3;
            font-family: Montserrat,sans-serif;
            font-weight: 200;
            font-size: 15px;
          `}>
          { totalCount } post(s)
        </div>
      </div>
    </HeaderWrapper>
  )

  return (
    <Layout
      header={header}
    >
      <PostList
        list={posts}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
`
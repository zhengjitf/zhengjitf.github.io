import React from "react"
import { Link, graphql } from "gatsby"
import { css } from '@emotion/core'

import { mq } from '../styles/mq'
import Layout from "../components/layout"
import RootAside from '../components/rootAside'
import HeaderWrapper from '../components/headerWrapper'
import Socials from '../components/socials'
import SEO from "../components/seo"
import PostList from '../components/postList'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const author = data.site.siteMetadata.author
    const edges = data.allMarkdownRemark.edges
    const posts = edges.map(({node}) => {
      return {
        title: node.frontmatter.title || node.fields.slug,
        description: node.frontmatter.description || node.excerpt,
        date: node.frontmatter.date,
        tags: node.frontmatter.tags,
        path: '/post' + node.fields.slug,
      }
    })

    const header = (
      <HeaderWrapper>
        <div
          css={css`
            position: absolute;
            top: 50%;
            ${mq({
              left: ['50%', 'auto'],
              transform: ['translate(-50%, -50%)', 'translate(0, -50%)'],
            })}
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
            <Socials
              css={css`
                ${mq({
                  justifyContent: ['center', 'normal'],
                })}
              `}
            />
          </div>
        </div>
      </HeaderWrapper>
    )

    const aside = (
      <div
        css={css`
          width: 230px;
          border-right: 1px solid #d9d9d9;
          ${mq({
            display: ['none', 'block'],
          })};
        `}
      >
        <RootAside />
      </div>
    )

    return (
      <Layout 
        title={siteTitle}
        header={header}
        aside={aside}
      >
        <SEO title="All posts" />
        <PostList
          list={posts}
        />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
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
`

import React from "react"
import { Link, graphql } from "gatsby"
import { css } from '@emotion/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = (node.frontmatter.tag || '').split(',').filter(Boolean)

          return (
            <article 
              key={node.fields.slug}
              css={css`
                padding: 80px 0;
                border-top: solid 1px #d9d9d9;
                &:first-of-type {
                  padding-top: 0;
                  border: 0;
                }
              `}
            >
              <header>
                <div className="post-data">
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
                  <span
                    css={css`
                      margin-left: 20px;
                      color: #a9afb3;
                      font-size: 16px;
                    `}
                  >
                    {node.frontmatter.date}
                  </span>
                </div>
                <h3
                  style={{
                    margin: '20px 0',
                  }}
                >
                  <Link 
                    css={css`
                      font-size: 42px;
                      line-height: 1.33;
                      letter-spacing: -.5px;
                      margin: 20px 0;
                      cursor: pointer;
                      color: #25333e;
                      text-decoration: none;
                      box-shadow: none;
                    `} 
                    to={'/post' + node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
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
            tag
          }
        }
      }
    }
  }
`

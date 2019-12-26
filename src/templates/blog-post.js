import React from "react"
import { Link, graphql } from "gatsby"
import { css } from '@emotion/core'

import 'prismjs/themes/prism-okaidia.css'
import { mq } from '../styles/mq'
import Layout from "../components/layout"
import HeaderWrapper from '../components/headerWrapper'
import Tag from '../components/tag'
import SEO from "../components/seo"
import RecommendList from "../components/recommendList"
import { rhythm } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const allNodes = this.props.data.allMarkdownRemark.edges.map(item => {
      return item.node
    })
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const tags = post.frontmatter.tags || []

    // 根据tag查找关联的博文
    const relatedPosts = allNodes.reduce((total, node) => {
      const post = node.frontmatter
      const itemTags = post.tags
      if (itemTags.length === 0) {
        return total
      }

      const matchedTags = itemTags.filter($tag => tags.includes($tag))

      if (matchedTags.length === 0) {
        return total
      }

      return total.concat({
        post: {
          title: post.title,
          description: post.description,
          tag: itemTags,
          date: post.date,
          path: '/post' + node.fields.slug,
        },
        matchedTagsCount: matchedTags.length,
      })
    }, []).sort((a, b) => b.matchedTagsCount - a.matchedTagsCount);

    const header = (
      <HeaderWrapper withBack>
        <div
          css={css`
            margin-top: 60px;
            text-align: center;
          `}
        >
          {
            tags.map(tag => {
              return (
                <Tag key={tag} label={tag} />
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
            { post.frontmatter.title }
          </h1>
          <div
            css={css`
              color: #a9afb3;
              font-family: Montserrat,sans-serif;
              font-weight: 200;
              font-size: 15px;
            `}>
            { post.frontmatter.date }
          </div>
        </div>
      </HeaderWrapper>
    )

    return (
      <Layout 
        header={header}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article 
          className="post-container"
          css={css`
            ${mq({
              width: ['100%', '770px'],
              margin: '0 auto',
            })}
          `}
        >
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={'/post' + previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={'/post' + next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
        
        <RecommendList
          list={relatedPosts.map(item => item.post).slice(0, 3)}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
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

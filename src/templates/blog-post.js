import React, { useState, useRef, useCallback, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import "prismjs/themes/prism-okaidia.css"
import { mq } from "../styles/mq"
import Layout from "../components/layout"
import HeaderWrapper from "../components/headerWrapper"
import Tag from "../components/tag"
import SEO from "../components/seo"
import PostTOC from "../components/postTOC"
import RecommendList from "../components/recommendList"
import { rhythm } from "../utils/typography"
import postCss from "../styles/post"

const BlogPostTemplate = props => {
  const { data, pageContext } = props

  const [activeTOCItem, setActiveTOCItem] = useState(null)
  const postTOCWrapperRef = useRef(null)
  const articleContentRef = useRef(null)

  const handlePostTOCFixedChange = useCallback((fixed, clientRect) => {
    if (fixed) {
      postTOCWrapperRef.current.style.width = `${clientRect.width}px`
    } else {
      postTOCWrapperRef.current.style.width = `auto`
    }
  }, [postTOCWrapperRef])

  useEffect(() => {
    const articleContentEl = articleContentRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.filter(entry => entry.intersectionRatio >= 0.8)[0]
        if (activeEntry) {
          const el = activeEntry.target
          setActiveTOCItem({
            depth: Number(el.tagName.match(/\d/)[0]),
            value: el.getAttribute('id'),
          })
        }
      },
      {
        threshold: [0.8],
      }
    )
    articleContentEl.querySelectorAll('.header-item').forEach(item => {
      const parentElement = item.parentElement
      observer.observe(parentElement)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const allNodes = data.allMarkdownRemark.edges.map(item => {
    return item.node
  })
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const tags = post.frontmatter.tags || []
  const headings = post.headings

  const formattedHeadings = headings.reduce(function fn(total, item) {
    const copyItem = { ...item }
    const last = total.slice(-1)[0]
    if (last && copyItem.depth > last.depth) {
      last.children = last.children || []
      fn(last.children, copyItem)
    } else {
      total.push(copyItem)
    }

    return total
  }, [])

  // 根据tag查找关联的博文
  const relatedPosts = allNodes
    .reduce((total, node) => {
      const $post = node.frontmatter
      if ($post.title === post.frontmatter.title) {
        return total
      }

      const itemTags = $post.tags

      if (itemTags.length === 0) {
        return total
      }

      const matchedTags = itemTags.filter($tag => tags.includes($tag))

      if (matchedTags.length === 0) {
        return total
      }

      return total.concat({
        post: {
          title: $post.title,
          description: $post.description,
          tag: itemTags,
          date: $post.date,
          path: "/post" + node.fields.slug,
        },
        matchedTagsCount: matchedTags.length,
      })
    }, [])
    .sort((a, b) => b.matchedTagsCount - a.matchedTagsCount)

  const header = (
    <HeaderWrapper withBack>
      <div
        css={css`
          margin-top: 60px;
          text-align: center;
        `}
      >
        {tags.map(tag => {
          return <Tag key={tag} label={tag} />
        })}
        <h1
          css={css`
            line-height: 1.33;
            letter-spacing: -0.6px;
            margin: 30px 0 18px;
            ${mq({
              fontSize: ["32px", "42px"],
            })};
          `}
        >
          {post.frontmatter.title}
        </h1>
        <div
          css={css`
            color: #a9afb3;
            font-family: Montserrat, sans-serif;
            font-weight: 200;
            font-size: 15px;
          `}
        >
          {post.frontmatter.date}
        </div>
      </div>
    </HeaderWrapper>
  )

  return (
    <Layout header={header}>
      <SEO
        title={post.frontmatter.title}
        keywords={tags.join(',')}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="post-container"
        css={css`
          ${mq({
            width: ["100%", "1000px"],
          })};
          ${postCss};
          max-width: 100%;
          position: relative;
          display: flex;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            flex: 1;
            overflow: hidden;
            padding-left: 20px;
          `}
        >
          <section
            ref={articleContentRef}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer></footer>
        </div>
        <div
          ref={postTOCWrapperRef}
          css={css`
            flex: none;
            margin-left: 20px;
            ${mq({
              display: ["none", "none", "block"],
            })};
          `}
        >
          <PostTOC
            onFixedChange={handlePostTOCFixedChange}
            headings={formattedHeadings}
            activeItem={activeTOCItem}
          />
        </div>
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
              <Link to={"/post" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/post" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {relatedPosts.length > 0 && (
        <RecommendList list={relatedPosts.map(item => item.post).slice(0, 3)} />
      )}
    </Layout>
  )
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
      headings {
        depth
        value
      }
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

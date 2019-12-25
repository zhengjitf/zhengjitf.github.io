import React from 'react'
import styled from '@emotion/styled'
import { useStaticQuery, graphql, Link } from "gatsby"

const Ul = styled.ul`
  padding: 0;
  margin: 25px 0;
`

const Li = styled.li`
  color: #d0414e;
  font-size: 18px;
  font-weight: 600;
`

const H4 = styled.h4`
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
  color: #73797d;
  margin: 0;
`

export default () => {
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

  let tags = allMarkdownRemark.edges.reduce((total, item) => {
    const $tags = item.node.frontmatter.tags
    total.push(...$tags)

    return total
  }, [])
  tags = Array.from(new Set(tags))

  console.log('tags', tags)

  console.log('allMarkdownRemark', allMarkdownRemark)

  return (
    <div>
      <div style={{}}>
        <H4>Tags</H4>
        <Ul>
          {
            tags.map(tag => {
              return (
                <Li key={tag}>
                  <Link to={`/tag/${tag}`}>{tag}</Link>
                </Li>
              )
            })
          }
        </Ul>
      </div>
      {/* <div style={{}}>
        <H4>Courses</H4>
        <Ul>
          <Li></Li>
        </Ul>
      </div>
      <div style={{}}>
        <H4>Languages</H4>
        <Ul>
          <Li></Li>
        </Ul>
      </div> */}
    </div>
  )
}
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

const A = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;

  & + a {
    margin-left: 10px;
  }
`

export default ({data}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              codepen
              github
            }
          }
        }
      }
    `
  )

  const social = site.siteMetadata.social

  return (
    <div style={{ display: 'flex' }}>
      <A 
        href={social.github}
        target="_blank"
      >
        <img style={{ width: 20, height: 20 }} src='/github.svg' alt=""/>
      </A>
      <A 
        href={social.codepen}
        target="_blank"
      >
        <img style={{ width: 20, height: 20 }} src='/codepen.svg' alt=""/>
      </A>
    </div>
  )
}

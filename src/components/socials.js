import React from 'react'
import { useStaticQuery, graphql, withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

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

export default (props) => {
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
    <div 
      css={css`
        display: flex;
      `}
      {...props}
    >
      <A 
        href={social.github}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img style={{ width: 20, height: 20 }} src={withPrefix('/github.svg')} alt=""/>
      </A>
      <A 
        href={social.codepen}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img style={{ width: 20, height: 20 }} src={withPrefix('/codepen.svg')} alt=""/>
      </A>
    </div>
  )
}

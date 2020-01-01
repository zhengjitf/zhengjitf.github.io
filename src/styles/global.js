import { css } from '@emotion/core'
import { mq } from './mq'

export default css`
  body {
    font-family: Lora,sans-serif;
    font-size: 20px;
    color: #25333e;
  }
  img {
    margin: 0;
  }
  ul, li {
    list-style: none;
  }
  a, h1, h2, h3, h4, h5, h6 {
    font-family: Montserrat,sans-serif;
  }
  a {
    box-shadow: none;
    color: inherit;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
  h4 {
    font-size: 24px;
    letter-spacing: -.3px;
  }
  .container {
    margin: auto;
    padding: 0 15px;
    
    ${mq({
      width: ['auto', '750px', '970px', '1170px'],
    })}
  }

  ::selection {
    color: #fff;
    background-color: #d0414e
  }

  blockquote {
    margin: 15px -5px;
    line-height: 1.6;
    font-style: italic;
    border-color: #d0414e;
    color: inherit;
  }

  .post-container {
    a {
      color: #d0414e;
      font-family: Lora,sans-serif;
      position: relative;
      text-decoration: none;
    }
  }
`
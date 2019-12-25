import { css } from '@emotion/core'

export const tag = css`
  border-radius: 28px;
  background: #d0414e;
  border: 2px solid #d0414e;
  text-decoration: none!important;
  display: inline-block;
  padding: 2px 15px;
  color: #fff;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 400px;

  & {
    margin-right: 10px;
  }

  &:last-child {
    margin-right: 0;
  }
`

export const postTitle = css`
  font-size: 42px;
  line-height: 1.33;
  letter-spacing: -.5px;
  margin: 20px 0;
  cursor: pointer;
  color: #25333e;
  text-decoration: none;
  box-shadow: none;
`
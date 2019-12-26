import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { mq } from '../styles/mq'
import { postTitle as postTitleCss } from '../styles/common'
import Tag from './tag'

const Title = styled.h4`
  font-size: 24px;
  letter-spacing: -.3px;
  text-align: center;
`

const RecommendItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`

const RecommendItem = styled.li`
  flex: none;
  padding: 30px;

  ${mq({
    width: ['100%', 'calc((100% - 60px) / 3)'],
    marginLeft: [0, '30px'],
  })}
  background: #fff;
  box-shadow: 0 0 30px 0 rgba(0,0,0,.08);

  &:first-of-type {
    margin-left: 0;
  }
`

export default (props) => {
  return (
    <div className="recommend-list">
      <Title>
        You might also like...
      </Title>
      <RecommendItems>
        {
          (props.list || []).slice(0, 3).map(item => {
            return (
              <RecommendItem key={item.title}>
                {
                  item.tag.map($tag => <Tag key={$tag} label={$tag} link />)
                }
                <div
                  style={{
                    marginTop: 10,
                  }}>
                  <Link
                    css={css`
                      ${postTitleCss};
                      font-size: 23px;
                      margin-bottom: 0;
                    `}
                    to={item.path}
                  >{item.title}</Link>
                </div>
                <div 
                  css={css`
                    color: #a9afb3;
                    font-size: 14px;
                  `}>{item.date}</div>
                <p
                  css={css`
                    margin-top: 10px;
                  `}>{item.description}</p>
              </RecommendItem>
            )
          })
        }
      </RecommendItems>
    </div>
  )
}
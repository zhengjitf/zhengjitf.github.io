import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'

import getPos from '../utils/getPos'

const Ul = styled.ul`
  margin-left: 15px;
  margin-top: 0;
`

const Li = styled.li`
  position: relative;
  list-style: none !important;
  margin-bottom: 0;
  &:before {
    content: '';
    position: absolute;
    left: -10px;
    top: 16px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: black;
  }
`

export default (props) => {
  const { headings, onFixedChange } = props

  const rootRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const rootEl = rootRef.current
    const innerEl = innerRef.current
    const { top: rootElOffsetTop } = getPos(rootEl)
    const clientRect = rootEl.getBoundingClientRect()

    const onScroll = debounce(
      (e) => {
        const scrollY = e.currentTarget.pageYOffset
        const hasFixedCls = innerEl.classList.contains('fixed')
        if (scrollY + 20 > rootElOffsetTop) {
          if (!hasFixedCls) {
            const { left: rootElOffsetLeft } = getPos(rootEl)
            innerEl.classList.add('fixed')
            innerEl.style.left = rootElOffsetLeft + 'px'
            onFixedChange(true, clientRect)
          }
        } else {
          if (hasFixedCls) {
            innerEl.classList.remove('fixed')
            onFixedChange(false, clientRect)
          }
        }
      },
      200
    )

    const onResize = debounce(
      (e) => {
        const { left: rootElOffsetLeft } = getPos(rootEl)
        innerEl.style.left = rootElOffsetLeft + 'px'
      },
      200
    )

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [onFixedChange])

  return (
    <div ref={rootRef}>
      <Ul
        css={css`
          margin-left: 0 !important;
          padding: 20px;
          background: #fff;
          border-radius: 4px;
          box-shadow: 0 0 10px 0 rgba(0,0,0,.08);

          &.fixed {
            position: fixed;
            top: 20px;
          }
        `}
        ref={innerRef}
      >
        {
          headings.map(function fn(item) {
            return (
              <Li key={item.value}>
                <a 
                  href={`#${item.value.toLowerCase()}`}
                  style={{ color: 'inherit' }}
                  css={css`
                    font-size: 0.8em;
                  `}
                >
                  {item.value}
                </a>
                {
                  item.children && item.children.length > 0 && (
                    <Ul>
                      {item.children.map(fn)}
                    </Ul>
                  )
                }
              </Li>
            )
          })
        }
      </Ul>

    </div>
  )
}

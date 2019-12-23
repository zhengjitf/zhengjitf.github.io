import React from 'react'
import styled from '@emotion/styled'

const Ul = styled.ul`
  padding: 0;
  margin: 25px 0;
`

const Li = styled.li`
  text-decoration: none;
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
  return (
    <div>
      <div style={{}}>
        <H4>Projects</H4>
        <Ul>
          <Li>Nest</Li>
        </Ul>
      </div>
      <div style={{}}>
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
      </div>
    </div>
  )
}
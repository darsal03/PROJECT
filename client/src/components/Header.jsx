import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '../stitches.config'
import Logo from './Logo'

function NonAuthNav() {
  return (
    <nav>
      <Link to="/">
        <Logo width="50" height="50" />
      </Link>
    </nav>
  )
}

export default function Header() {
  // const [auth] = useAuth()

  return (
    <StyledHeader auth={false /* !!auth.user */}>
      {/* {!!auth.user ? <AuthNav /> : <NonAuthNav />} */}
      <NonAuthNav />
    </StyledHeader>
  )
}

const StyledHeader = styled('header', {
  position: 'sticky',
  top: 0,
  maxWi: '100vw',
  height: 'var(--headerHeight)',
  bg: '#0f005c',
  boxShadow: '0 0 1rem rgba(0, 0, 0, 0.15)',

  variants: {
    auth: {
      true: {},
      false: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})

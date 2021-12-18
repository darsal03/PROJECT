import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/auth'
import { styled } from '../stitches.config'
import Logo from './icons/Logo'

function NonAuthNav() {
  return (
    <nav>
      <Link to="/">
        <Logo width="50" height="50" />
      </Link>
    </nav>
  )
}

function AuthNav() {
  const { logout } = useAuth()
  return (
    <nav>
      <Link to="/">
        <Logo width="50" height="50" />
      </Link>
      <LogoutButton onClick={() => logout()}>LOGOUT</LogoutButton>
    </nav>
  )
}

export default function Header() {
  const { user } = useAuth()

  return (
    <StyledHeader auth={user ? true : false}>{user ? <AuthNav /> : <NonAuthNav />}</StyledHeader>
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
      true: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      false: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})

const LogoutButton = styled('button', {
  position: 'absolute',
  margin: '0.9rem 5rem 0 0 ',
  padding: '0.8rem',
  right: '0',
  fontSize: '$body',
  border: '0.1rem solid white',
  borderRadius: '0.6rem',
  transition: '0.3s ease-in-out',
  color: '#fff',

  '&:hover': {
    bg: '#fff',
    color: '#0f005c',
  },
})

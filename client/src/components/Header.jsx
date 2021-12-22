import { keyframes } from '@stitches/react'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/auth'
import { useClickOutside } from '../hooks/use-click-outside'
import { styled } from '../stitches.config'
import Logo from './icons/Logo'
import { UserIcon } from './icons/UserIcon'

function Avatar({ onClick }) {
  return (
    <AvatarButton onClick={onClick}>
      <UserIcon />
    </AvatarButton>
  )
}

function AvatarBox({ onClick, onClickOutside }) {
  const modalRef = useRef()

  useClickOutside(modalRef, onClickOutside)

  return (
    <MenuBox ref={modalRef}>
      <ul>
        <MenuItem>
          <Link to="/profile">Profile Page</Link>
        </MenuItem>
        <MenuItem>
          <button onClick={onClick}>Log Out</button>
        </MenuItem>
      </ul>
    </MenuBox>
  )
}

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { logout } = useAuth()

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <nav>
      <Link to="/">
        <Logo width="50" height="50" />
      </Link>
      <Avatar onClick={handleModalToggle} />
      {isModalOpen && <AvatarBox onClick={logout} onClickOutside={() => setIsModalOpen(false)} />}
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

const AvatarButton = styled('button', {
  position: 'absolute',
  margin: '0.9rem 5rem 0 0 ',
  right: '0',
  fontSize: '$body',
  borderRadius: '0.6rem',
  transition: '0.3s ease-in-out',
  fill: '#fff',
  '&:hover': {
    color: '#0f005c',
    fill: '#008000',
  },
})

const MenuBoxAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(1.8rem)',
  },
})

const MenuBox = styled('div', {
  position: 'absolute',
  margin: '-1rem 0rem',
  right: '0',
  zIndex: '1',
  opacity: '0',
  animation: `${MenuBoxAnimation} 0.3s forwards`,
  boxShadow: '0 0 1rem rgba(0, 0, 0, 0.15)',
  bg: '#fff',
})

const MenuItem = styled('li', {
  fontSize: '$caption',
  padding: '1rem 3rem',
})

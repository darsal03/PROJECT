import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { Spinner } from './Meals'
import { SpinIcon } from '../components/icons/Spinner'

import { useAuth } from '../contexts/auth'
import { useDeleteUser } from '../hooks/use-delete-user'
import { useUsers } from '../hooks/use-users'
import { styled } from '../stitches.config'

const ButtonWrapper = styled('div', {
  display: 'flex',
})

const ActionButton = styled('button', {
  margin: '0 0.5rem',
  fontSize: '$body',
  transition: '0.15s ease-in-out',
  '&:hover': {
    color: '#008000',
  },
})

const Modal = styled('div', {
  position: 'fixed',
  right: '0',
  margin: '2rem 3rem',
  padding: '3rem',
  textAlign: 'center',
  zIndex: '1',
  bg: '#fff',
  borderRadius: '1rem',
  border: '0.2rem solid #008000',
})

const ModalButton = styled('button', {
  padding: '0.5rem 3rem',
  margin: '1rem 1rem 0',
  border: '0.1rem solid #008000',
  borderRadius: '0.8rem',
  transition: '0.15s ease-in-out',
  '&:hover': {
    bg: '#008000',
    color: '#fff',
  },
})

const Paragraph = styled('p', {
  fontSize: '$body',
})

const TableWrapper = styled('div', {
  variants: {
    modalOpen: {
      true: {
        opacity: '0.3',
      },
    },
  },
})

function DeleteModal({ selectedUser, onModalClose, onUserDelete }) {
  const handleDelete = (event, id = selectedUser.id) => {
    onUserDelete(id)
  }
  return (
    <Modal>
      <Paragraph>{`Are you sure you want to delete user "${selectedUser.username}"`}</Paragraph>
      <ModalButton onClick={handleDelete}>Yes</ModalButton>
      <ModalButton onClick={onModalClose}>No</ModalButton>
    </Modal>
  )
}

function UserTableRow({ user, onModalOpen, onNavigate }) {
  const handleModal = (event, id = user.id, username = user.username) => {
    onModalOpen({ id, username })
  }
  const handleNavigate = (event, id = user.id, username = user.username) => {
    onNavigate({ id, username })
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ fontSize: '2rem' }}>
        {user.id}
      </TableCell>
      <TableCell sx={{ fontSize: '2rem' }}>{user.username}</TableCell>
      <TableCell sx={{ fontSize: '2rem' }}>{user.role}</TableCell>
      <TableCell sx={{ fontSize: '2rem' }}>
        <ButtonWrapper>
          <ActionButton onClick={handleModal}>Delete</ActionButton>
          <ActionButton onClick={handleNavigate}>Edit</ActionButton>
        </ButtonWrapper>
      </TableCell>
    </TableRow>
  )
}

export function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    username: '',
  })
  const { data: users, isFetching } = useUsers()
  const { user } = useAuth()
  const { mutate: deleteUser } = useDeleteUser()
  const navigate = useNavigate()

  const handleModalOpen = ({ username, id }) => {
    if (user.username === username) {
      return alert('you can not delete yourself here')
    }
    setIsModalOpen(true)
    setSelectedUser({ id, username })
  }

  const handleNavigate = ({ username, id }) => {
    if (user.username === username) {
      navigate(`/profile`)
    } else {
      navigate(`/user/${id}`)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleUserDelete = (id) => {
    deleteUser(id)
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen ? (
        <DeleteModal
          selectedUser={selectedUser}
          onModalClose={handleModalClose}
          onUserDelete={handleUserDelete}
        />
      ) : null}

      <TableWrapper modalOpen={isModalOpen && 'true'}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '2rem', color: '#008000' }}>ID</TableCell>
                <TableCell sx={{ fontSize: '2rem', color: '#008000' }}>Username</TableCell>
                <TableCell sx={{ fontSize: '2rem', color: '#008000' }}>Role</TableCell>
                <TableCell sx={{ fontSize: '2rem', color: '#008000' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isFetching
                ? users.map((user) => {
                    return (
                      <UserTableRow
                        key={user.id}
                        user={user}
                        onModalOpen={handleModalOpen}
                        onNavigate={handleNavigate}
                      />
                    )
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
      {isFetching && (
        <Spinner>
          <SpinIcon />
        </Spinner>
      )}
    </>
  )
}

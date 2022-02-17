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

import { UserTableRow } from '../components/usersPage/UserTableRow'
import { DeleteModal } from '../components/usersPage/DeleteModal'

import { useAuth } from '../contexts/auth'
import { useDeleteUser } from '../hooks/use-delete-user'
import { useUsers } from '../hooks/use-users'
import { styled } from '../stitches.config'

const TableWrapper = styled('div', {
  variants: {
    modalOpen: {
      true: {
        opacity: '0.3',
      },
    },
  },
})

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

  const handleModalOpen = (id, username) => {
    if (user.username === username) {
      return alert('you can not delete yourself here')
    }
    setIsModalOpen(true)
    setSelectedUser({ id, username })
  }

  const handleEdit = (id, username) => {
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
                        onNavigate={handleEdit}
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

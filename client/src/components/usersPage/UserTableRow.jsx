import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import { styled } from '../../stitches.config'

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

export function UserTableRow({ user, onModalOpen, onNavigate }) {
  const handleDelete = (event) => {
    onModalOpen(user.id, user.username)
  }
  const handleNavigate = (event) => {
    onNavigate(user.id, user.username)
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
          <ActionButton onClick={handleDelete}>Delete</ActionButton>
          <ActionButton onClick={handleNavigate}>Edit</ActionButton>
        </ButtonWrapper>
      </TableCell>
    </TableRow>
  )
}

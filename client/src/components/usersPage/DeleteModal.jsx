import { styled } from '../../stitches.config'

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

export function DeleteModal({ selectedUser, onModalClose, onUserDelete }) {
  const handleDelete = (event) => {
    onUserDelete(selectedUser.id)
  }
  return (
    <Modal>
      <Paragraph>{`Are you sure you want to delete user "${selectedUser.username}"`}</Paragraph>
      <ModalButton onClick={handleDelete}>Yes</ModalButton>
      <ModalButton onClick={onModalClose}>No</ModalButton>
    </Modal>
  )
}

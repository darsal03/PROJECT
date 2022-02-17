import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Spinner } from './Meals'
import { SpinIcon } from '../components/icons/Spinner'
import { useGetUser } from '../hooks/use-get-user'
import { styled } from '../stitches.config'
import { useEditUser } from '../hooks/use-edit-user'

const UsersPageWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-evenly',
  '@mobile': {
    flexDirection: 'column',
  },
})

const Avatar = styled('div', {
  margin: '9rem 0 0 20rem',
  '@mobile': {
    margin: '5rem auto',
  },
})

const Picture = styled('div', {
  margin: '0 5rem',
  width: '30rem',
  height: '30rem',
})

const Img = styled('img', {
  width: '30rem',
  height: '30rem',
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center',
})

const NoPhoto = styled('h2', {
  padding: '14rem 0 0 0',
  fontSize: '$body',
  fontWeight: '400',
  textAlign: 'center',
})

const UserName = styled('h1', {
  margin: '1.5rem 0 0 0',
  textAlign: 'center',
  fontSize: '$heading',
  fontWeight: '400',
  '@mobile': {
    textAlign: 'center',
  },
})

const UserDetails = styled('div', {
  margin: '10rem 30rem 0 0 ',
  padding: '0rem 10rem',
  borderRadius: '2rem',
  boxShadow: ' 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
  '@mobile': {
    margin: '3rem auto',
  },
})

const UserDetailsHeading = styled('h1', {
  margin: '1rem 0',
  textAlign: 'center',
  fontSize: '$heading',
  fontWeight: '400',
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
})

const Input = styled('input', {
  margin: '2rem 0',
  padding: '1rem',
  width: '30rem',
  height: '3.5rem',
  fontSize: '$body',
  border: '0.1rem solid #808080',
  borderRadius: '1rem',
})

const FileInput = styled('input', {
  fontSize: '$body',
})

const Label = styled('label', {
  fontSize: '$body',
})

const FormButton = styled('button', {
  margin: '3rem auto 3rem',
  padding: '1rem 4rem',
  fontSize: '$title',
  borderRadius: '1rem',
  border: '0.1rem solid #008000',
  transition: 'ease-in-out 0.3s',
  color: '#008000',
  '&:hover': {
    boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
    bg: '#008000',
    color: '#fff',
  },
})

const ActionButtonWrapper = styled('div', {
  display: 'flex',
})

export function UserEdit() {
  const { id } = useParams()
  const { data: user, isSuccess, isFetching } = useGetUser(id)

  return (
    <>
      {isSuccess ? (
        <EditForm userDetails={user} isFetching={isFetching} />
      ) : (
        <Spinner>
          <SpinIcon />
        </Spinner>
      )}
    </>
  )
}

function EditForm({ userDetails, isFetching }) {
  const [user, setUser] = useState({
    id: userDetails.id,
    username: userDetails.username,
    email: userDetails.email,
    calorieLimit: userDetails.calorieLimit ?? undefined,
  })
  const imageInputRef = useRef()
  const navigate = useNavigate()
  const { mutate: update } = useEditUser()

  const handleAvatarChange = (event) => {
    const reader = new FileReader()

    reader.onload = () => {
      update({ id: user.id, image: reader.result })
    }
    reader.onerror = (err) => {
      console.error({ err })
    }

    if (event.target.files) {
      const [file] = event.target.files
      const sizeInKB = file.size / 1024
      if (sizeInKB > 500) {
        alert('Image size is too big')
        imageInputRef.current.value = ''
      } else {
        reader.readAsDataURL(event.target.files[0])
      }
    }
  }

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      userDetails.username === user.username &&
      userDetails.email === user.email &&
      userDetails.calorieLimit === user.calorieLimit
    ) {
      return alert('you must change something in order to save')
    }
    update(user)
  }

  const handleReturnToPage = () => {
    navigate(-1)
  }

  return (
    <>
      {isFetching && (
        <Spinner>
          <SpinIcon />
        </Spinner>
      )}
      <UsersPageWrapper>
        <Avatar>
          <Picture>
            {Boolean(userDetails.image) != null ? (
              <Img src={userDetails.image} alt="Avatar" />
            ) : (
              <NoPhoto>Add a photo </NoPhoto>
            )}
          </Picture>
          <UserName>{user.username}</UserName>
        </Avatar>
        <UserDetails>
          <UserDetailsHeading>User Info</UserDetailsHeading>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username:</Label>
            <Input type="text" name="username" value={user.username} onChange={handleInputChange} />
            <Label htmlFor="email">Username:</Label>
            <Input type="text" name="email" value={user.email} onChange={handleInputChange} />
            <Label htmlFor="calorieLimit">Calorie limit:</Label>
            <Input
              type="number"
              name="calorieLimit"
              value={user.calorieLimit}
              onChange={handleInputChange}
            />
            <FileInput
              ref={imageInputRef}
              name="image"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <ActionButtonWrapper>
              <FormButton type="button" onClick={handleReturnToPage}>
                Back
              </FormButton>
              <FormButton>Save</FormButton>
            </ActionButtonWrapper>
          </Form>
        </UserDetails>
      </UsersPageWrapper>
    </>
  )
}

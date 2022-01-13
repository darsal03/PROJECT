import { useState } from 'react'
import { useUpdateUser } from '../hooks/use-update-user'

import { styled } from '../stitches.config'
import { useAuth } from '../contexts/auth'

const ProfilePageWrapper = styled('div', {
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
  borderRadius: '30rem',
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

const UserDets = styled('div', {
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
  padding: '1rem 5rem',
  fontSize: '$title',
  borderRadius: '1rem',
  border: '0.1rem solid #008000',
  transition: 'ease-in-out 0.3s',
  color: '#008000',
  '&:hover': {
    boxShadow: ' 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
    bg: '#008000',
    color: '#fff',
  },
})

export function ProfilePage() {
  const auth = useAuth()

  const [user, setUser] = useState({
    id: auth.user.id,
    username: auth.user.username,
    email: auth.user.email,
    calorieLimit: !auth.user.calorieLimit ? undefined : auth.user.calorieLimit,
    image: !auth.user.image ? undefined : auth.user.image,
    fileName: !auth.user.fileName ? undefined : auth.user.fileName,
  })
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: update, isLoading } = useUpdateUser()

  const handleFileToBase64 = (file) => {
    const reader = new FileReader()

    if (file && file.type.match('image *')) {
      reader.readAsDataURL(file)
    }

    reader.onload = () => {
      setUser((prev) => ({
        ...prev,
        image: reader.result,
        fileName: file.name,
      }))
    }
    reader.onerror = (err) => {
      throw err
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      auth.user.username === user.username &&
      auth.user.email === user.email &&
      auth.user.calorieLimit === user.calorieLimit &&
      auth.user.image === user.image
    ) {
      setIsEditing(false)
      return alert('you must change something in order to save')
    }

    update(user)
  }

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0].name !== user.fileName) {
      handleFileToBase64(event.target.files[0])
    }

    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <ProfilePageWrapper>
      <Avatar>
        <Picture>
          {user.image === undefined ? (
            <NoPhoto>Add a photo </NoPhoto>
          ) : (
            <Img src={user.image} alt="Avatar" />
          )}
        </Picture>
        <UserName>{user.username}</UserName>
      </Avatar>
      <UserDets>
        <UserDetailsHeading>User Info</UserDetailsHeading>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">Username:</Label>
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
            onFocus={() => setIsEditing(true)}
          />
          <Label htmlFor="email">Email:</Label>
          <Input
            name="email"
            value={user.email}
            onChange={handleChange}
            onFocus={() => setIsEditing(true)}
          />
          <Label htmlFor="calorieLimit">Calorielimit:</Label>
          <Input
            name="calorieLimit"
            type="number"
            placeholder="set calorie limit"
            value={user.calorieLimit}
            onChange={handleChange}
            onFocus={() => setIsEditing(true)}
          />
          <Label htmlFor="image">Image:</Label>
          <FileInput
            name="image"
            type="file"
            onFocus={() => setIsEditing(true)}
            onChange={handleChange}
          />
          <FormButton type="submit" disabled={isEditing ? false : true || (isLoading && true)}>
            Save
          </FormButton>
        </Form>
      </UserDets>
    </ProfilePageWrapper>
  )
}

import { useRef, useState } from 'react'
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
  const imageInputRef = useRef()

  const [user, setUser] = useState({
    id: auth.user.id,
    username: auth.user.username,
    email: auth.user.email,
    calorieLimit: !auth.user.calorieLimit ? undefined : auth.user.calorieLimit,
  })
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: update, isLoading } = useUpdateUser()

  const handleAvatarChange = (event) => {
    const reader = new FileReader()

    reader.onload = () => {
      update({ id: auth.user.id, image: reader.result })
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

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      auth.user.username === user.username &&
      auth.user.email === user.email &&
      auth.user.calorieLimit === user.calorieLimit
    ) {
      setIsEditing(false)
      return alert('you must change something in order to save')
    }

    update(user)
  }

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  return (
    <ProfilePageWrapper>
      <Avatar>
        <Picture>
          {Boolean(auth.user.image) != null ? (
            <Img src={auth.user.image} alt="Avatar" />
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
            ref={imageInputRef}
            name="image"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <FormButton type="submit" disabled={isEditing ? false : true || (isLoading && true)}>
            Save
          </FormButton>
        </Form>
      </UserDetails>
    </ProfilePageWrapper>
  )
}

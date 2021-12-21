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
  border: '0.1rem solid #008000',
  borderRadius: '20rem',
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

const Form = styled({
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
  const { user } = useAuth()
  const { username, email } = user
  return (
    <ProfilePageWrapper>
      <Avatar>
        <Picture />
        <UserName>{username}</UserName>
      </Avatar>
      <UserDets>
        <UserDetailsHeading>User Info</UserDetailsHeading>
        <Form>
          <Label for="username">Username:</Label>
          <Input name="userame" value={username} />
          <Label for="email">Email:</Label>
          <Input name="email" value={email} />
          <Label for="calorieLimit">Calorielimit:</Label>
          <Input name="calorieLimit" value="1000" />
          <FormButton>Save</FormButton>
        </Form>
      </UserDets>
    </ProfilePageWrapper>
  )
}

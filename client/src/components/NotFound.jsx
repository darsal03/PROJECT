import { useNavigate } from 'react-router-dom'
import { styled } from '../stitches.config'

const Wrapper = styled('div', {
  textAlign: 'center',
  margin: '4rem 0',
})

const FourOFour = styled('h1', {
  fontSize: '$heading',
})

const BackButton = styled('button', {
  margin: '3rem 0',
  padding: '1rem 7rem',
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

export function NotFound() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <FourOFour>404 NOT FOUND</FourOFour>
      <BackButton onClick={() => navigate('/', { replace: true })}> go back </BackButton>
    </Wrapper>
  )
}

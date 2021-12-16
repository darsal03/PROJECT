import React from 'react'

import { useAuth } from '../contexts/auth'
import { Meal } from '../components/Meal'
import { useMeals } from '../hooks/use-meals'

import { styled } from '../stitches.config'
import { spinner } from '../components/icons/spinner'
import { keyframes } from '@stitches/react'

const MealsWrapper = styled('div', {
  display: 'flex',
  '@mobile': {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const spinnerAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const Spinner = styled('div', {
  textAlign: 'center',
  animation: `${spinnerAnimation} 0.8s infinite`,
})

const Header = styled('h1', {
  margin: '4rem 0',
  textAlign: 'center',
  fontSize: '$heading',
  fontWeight: 'normal',
})

export function Meals() {
  const { user } = useAuth()
  const { data: meals, isFetching, isSuccess } = useMeals()

  return (
    <>
      <Header>{`Hi ${user.username}, here are your meals`}</Header>
      {isFetching && <Spinner>{spinner}</Spinner>}
      {isSuccess && (
        <MealsWrapper>
          {meals.map(({ id, name, calories, parsedDate, parsedTime }) => (
            <Meal key={id} meal={{ parsedDate, calories, name, parsedTime }} />
          ))}
        </MealsWrapper>
      )}
    </>
  )
}

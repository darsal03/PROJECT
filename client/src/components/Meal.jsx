import { useState } from 'react'
import { styled } from '../stitches.config'
import { DoneIcon } from './icons/Checkmark'
import { DeleteIcon } from './icons/Delete'
import { FoodIcon } from './icons/FoodIcon'

const MealWrapper = styled('div', {
  width: '35rem',
  height: '35rem',
  margin: '2rem',
  borderRadius: '0.5rem',
  boxShadow: ' 0 0.5rem 1.1rem rgba(0.35, 0.35, 0.35, 0.35)',
  '@mobile': {
    width: '45rem',
    height: '45rem',
  },
})

const MealTitle = styled('h1', {
  textAlign: 'center',
  margin: '1rem',
  fontSize: '$heading',
  fontWeight: '400',
})

const MealDetail = styled('p', {
  margin: '1.5rem',
  fontSize: '$title',
  '@mobile': {
    margin: '2rem',
    fontSize: '$heading',
  },
})

const ButtonWrapper = styled('div', {
  margin: '2rem 0',
  textAlign: 'center',
  '@mobile': {
    fontSize: '$heading',
  },
})

const ActionButton = styled('button', {
  margin: '0 2.5rem',
  transition: '0.3s ease-in-out',
  fill: '	#000000',
  '&:hover': {
    fill: 'Green',
  },
  '@mobile': {
    margin: '2rem 3rem',
  },
})

const CalorieText = styled('p', {
  variants: {
    calories: {
      over: {
        textAlign: 'center',
        color: '#FF0000',
      },
      under: {
        textAlign: 'center',
        color: '#008000',
      },
    },
  },
})

export function Meal({ meal }) {
  const [calorieExceeds, setCalorieExceeds] = useState(false)
  const { parsedDate, calories, name, parsedTime } = meal
  const { day, month, year } = parsedDate
  const { hour, minute } = parsedTime
  return (
    <MealWrapper>
      <MealTitle>
        <FoodIcon /> {name}
      </MealTitle>
      <MealDetail>--{`Calories = ${calories}`}</MealDetail>
      <MealDetail>--{`Eaten on : ${day}/${month}/${year}`}</MealDetail>
      <MealDetail>--{`Eaten at : ${hour}:${minute}`}</MealDetail>
      <MealDetail>
        <CalorieText calories={!calorieExceeds ? 'under' : 'over'}>
          {!calorieExceeds ? '--under the limit--' : '--over the limit--'}
        </CalorieText>
      </MealDetail>
      <ButtonWrapper>
        <ActionButton>
          <DoneIcon />{' '}
        </ActionButton>
        <ActionButton>
          <DeleteIcon />{' '}
        </ActionButton>
      </ButtonWrapper>
    </MealWrapper>
  )
}

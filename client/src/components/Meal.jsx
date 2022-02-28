import { useState } from 'react'

import isValid from 'date-fns/isValid'
import { getDate, getHours, getMinutes, getMonth, getYear } from 'date-fns'
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/lab'

import { styled } from '../stitches.config'
import { EditButton } from './icons/Edit'
import { DeleteIcon } from './icons/Delete'
import { FoodIcon } from './icons/FoodIcon'

import { useUpdateMeal } from '../hooks/use-update-meal'
import { useDeleteMeal } from '../hooks/use-delete-meal'

const MealWrapper = styled('div', {
  width: '30rem',
  height: 'fit-content',
  margin: '2rem 3rem ',
  borderRadius: '0.5rem',
  boxShadow: ' 0 0.5rem 1.1rem rgba(0.35, 0.35, 0.35, 0.35)',
  '@mobile': {
    width: '35rem',
    height: 'fit-content',
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
  fill: '#000000',
  '&:hover': {
    fill: '#008000',
  },
  '@mobile': {
    margin: '2rem 3rem',
  },
})

const CalorieText = styled('span', {
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

const FormWrapper = styled('div', {
  margin: '2rem 3rem',
  width: '30rem',
  height: '35rem',
  borderRadius: '0.5rem',
  boxShadow: ' 0 0.5rem 1.1rem rgba(0.35, 0.35, 0.35, 0.35)',
  '@mobile': {
    width: '35rem',
    height: '35rem',
  },
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  width: '30rem',
  padding: '2rem',
})

const Label = styled('label', {
  margin: '0.5rem 0 0.3rem 0',
  fontSize: '$body',
})

const Input = styled('input', {
  margin: '1rem 0 0 0',
  padding: '1.5rem',
  height: '1rem',
  fontSize: '$body',
  border: '0.1rem solid #808080',
  borderRadius: '1rem',
})

const FormButton = styled('button', {
  margin: '2rem 0.7rem 0',
  padding: '1rem 2rem',
  fontSize: '$body',
  borderRadius: '1rem',
  border: '0.1rem solid #008000',
  transition: 'ease-in-out 0.3s',
  color: '#008000',
  '&:hover': {
    color: '#fff',
    bg: '#008000',
    boxShadow: ' 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35)',
  },
  '@mobile': {
    padding: '1rem 2rem',
  },
})

function MealDetails({ meal, calorieExceeds, onDeleteMeal, onEditOpen }) {
  const date = new Date(meal.date)
  const year = getYear(date)
  const month = getMonth(date) + 1
  const day = getDate(date)
  const hour = getHours(date)
  const minute = getMinutes(date)

  const handleDeleteMeal = () => {
    onDeleteMeal(meal.id)
  }

  return (
    <MealWrapper>
      <MealTitle>
        <FoodIcon />
        {meal.name}
      </MealTitle>
      <MealDetail>--{`Calories = ${meal.calories}`}</MealDetail>
      <MealDetail>--{`Eaten on : ${month}/${day}/${year}`}</MealDetail>
      <MealDetail>--{`Eaten at : ${hour}:${minute}`}</MealDetail>
      <MealDetail>
        <CalorieText calories={!calorieExceeds ? 'under' : 'over'}>
          {!calorieExceeds ? '--under the limit--' : '--over the limit--'}
        </CalorieText>
      </MealDetail>
      <ButtonWrapper>
        <ActionButton onClick={onEditOpen} data-testid="editButton">
          <EditButton />{' '}
        </ActionButton>
        <ActionButton onClick={handleDeleteMeal}>
          <DeleteIcon />{' '}
        </ActionButton>
      </ButtonWrapper>
    </MealWrapper>
  )
}

function EditMeal({ meal, onEditClose, onInputChange, onUpdateMeal, onDateChange }) {
  return (
    <FormWrapper>
      <Form onSubmit={(event) => onUpdateMeal(event, meal)}>
        <Label htmlFor="name">Name:</Label>
        <Input type="text" id="name" name="name" value={meal.name} onChange={onInputChange} />
        <Label htmlFor="date">Date:</Label>
        <DateTimePicker
          clearable
          ampm
          id="date"
          name="date"
          value={meal.date}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Label htmlFor="calories">Calories:</Label>
        <Input
          type="number"
          id="calories"
          name="calories"
          value={meal.calories}
          onChange={onInputChange}
        />
        <ButtonWrapper>
          <FormButton onClick={onEditClose}>Cancel Edit</FormButton>
          <FormButton>Update</FormButton>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  )
}

export function Meal({ meal: mealDetails }) {
  const [calorieExceeds, setCalorieExceeds] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [meal, setMeal] = useState({
    id: mealDetails.id,
    name: mealDetails.name,
    date: mealDetails.date,
    calories: mealDetails.calories,
  })
  const { mutate: updateMeal } = useUpdateMeal()
  const { mutate: deleteMeal } = useDeleteMeal()

  const handleEditOpen = () => setIsEditing(true)

  const handleEditClose = () => {
    setIsEditing(false)
    setMeal({ ...mealDetails })
  }

  const handleInputChange = (event) => {
    setMeal({ ...meal, [event.target.name]: event.target.value })
  }

  const handleDateChange = (newDate) => {
    setMeal({ ...meal, date: newDate })
  }

  const handleMealUpdate = (event, meal) => {
    event.preventDefault()
    if (isValid(meal.date)) {
      updateMeal(meal)
      setIsEditing(false)
    } else {
      return alert('you entered invalid date')
    }
  }

  const handleMealDelete = (id) => {
    deleteMeal(id)
  }

  return (
    <>
      {isEditing ? (
        <EditMeal
          onEditClose={handleEditClose}
          meal={meal}
          onInputChange={handleInputChange}
          onDateChange={handleDateChange}
          onUpdateMeal={handleMealUpdate}
        />
      ) : (
        <MealDetails
          meal={meal}
          calorieExceeds
          onDeleteMeal={handleMealDelete}
          onEditOpen={handleEditOpen}
        />
      )}
    </>
  )
}

import { useState } from 'react'

import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/lab'
import isValid from 'date-fns/isValid'
import getTime from 'date-fns/getTime'

import { styled } from '../stitches.config'
import { Plus } from './icons/Plus'
import { useAddMeal } from '../hooks/use-add-meal'

const AddMealWrapper = styled('div', {
  margin: '2rem 3rem',
  padding: '10rem',
  width: '30rem',
  height: '35rem',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  transition: '0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 0.5rem 1.1rem rgba(0.35, 0.35, 0.35, 0.35)',
  },
  '@mobile': {
    width: '35rem',
    height: '35rem',
    padding: '12rem',
  },
})

const AddMealButton = styled('button', {
  '& svg': {
    fill: '#000000',
    transition: '0.3s ease-in-out',
  },
  '&:hover svg': {
    fill: '#008000',
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
    height: 'fit-content',
  },
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
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
  margin: '2rem 0.6rem 0',
  padding: '1rem 3rem',
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
    padding: '1rem 5rem',
  },
})

const ButtonWrapper = styled('div', {
  margin: '2rem 0',
  textAlign: 'center',
  '@mobile': {
    fontSize: '$heading',
  },
})

function AddMealCard({ onAddMealOpen }) {
  return (
    <AddMealWrapper onClick={onAddMealOpen}>
      <AddMealButton>
        <Plus />
      </AddMealButton>
    </AddMealWrapper>
  )
}

function AddMealForm({ onAddMealClose, onInputChage, onDateChange, onSubmit, meal }) {
  return (
    <FormWrapper>
      <Form onSubmit={onSubmit}>
        <Label htmlFor="name">Name:</Label>
        <Input name="name" value={meal.name} onChange={onInputChage} />
        <Label htmlFor="date">Date:</Label>
        <DateTimePicker
          clearable
          ampm
          name="date"
          value={meal.date}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <Label htmlFor="calories">Calories:</Label>
        <Input type="number" name="calories" value={meal.calories} onChange={onInputChage} />
        <ButtonWrapper>
          <FormButton onClick={onAddMealClose}>Cancel</FormButton>
          <FormButton>Add</FormButton>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  )
}

export function AddMeal() {
  const [isAddMealOpen, setIsAddMealOpen] = useState(false)
  const [meal, setMeal] = useState({
    name: 'My Meal',
    date: null,
    calories: 400,
  })

  const { mutate: AddMeal } = useAddMeal()

  const handleAddMealOpen = () => setIsAddMealOpen(true)

  const handleAddMealClose = () => setIsAddMealOpen(false)

  const handleInputChange = (event) => {
    setMeal({ ...meal, [event.target.name]: event.target.value })
  }

  const handleDateTimeChange = (newDate) => {
    if (isValid(newDate)) {
      const date = getTime(newDate)
      setMeal({ ...meal, date })
    }
  }

  const handleAddMeal = (event) => {
    event.preventDefault()
    if (meal.name && meal.date && meal.calories) {
      AddMeal(meal)
      setIsAddMealOpen(false)
      setMeal({
        name: 'My Meal',
        date: null,
        calories: 400,
      })
    } else {
      return alert('please fill all fields')
    }
  }

  return (
    <>
      {isAddMealOpen ? (
        <AddMealForm
          meal={meal}
          onAddMealClose={handleAddMealClose}
          onInputChage={handleInputChange}
          onDateChange={handleDateTimeChange}
          onSubmit={handleAddMeal}
        />
      ) : (
        <AddMealCard onAddMealOpen={handleAddMealOpen} />
      )}
    </>
  )
}

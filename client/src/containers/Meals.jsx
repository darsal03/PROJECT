import React, { useState } from 'react'

import { useAuth } from '../contexts/auth'
import { useMeals } from '../hooks/use-meals'

import { Meal } from '../components/Meal'

import { styled } from '../stitches.config'
import { keyframes } from '@stitches/react'

import TextField from '@mui/material/TextField'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import { SpinIcon } from '../components/icons/Spinner'
import { AscIcon } from '../components/icons/AscIcon'
import { DescIcon } from '../components/icons/DescIcon'
import { formatISO } from 'date-fns'

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
  fontWeight: '400',
})

const FilterBar = styled('div', {
  display: 'flex',
  height: '7rem',
  border: '0.1rem solid red',
})

const ActionButton = styled('button', {
  margin: '1.5rem 1.1rem',
  transition: '0.3s ease-in-out',
  fill: '#000000',
  '&:hover': {
    fill: 'Green',
  },
  '@mobile': {
    margin: '2rem 3rem',
  },
})

const PickerWrapper = styled('div', {
  margin: '1rem',
})

export function Meals() {
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)

  const { user } = useAuth()
  const { data: meals, isFetching, isSuccess, refetch } = useMeals(user.id, dateFrom, dateTo)

  const handleDateFrom = (newDate) => {
    const date = formatISO(newDate, { representation: 'date' })
    const startYear = date.split('-')[0]
    const startMonth = date.split('-')[1]
    const startDay = date.split('-')[2]

    setDateFrom({
      startYear,
      startMonth,
      startDay,
    })
    refetch({ queryKey: 'meals' })
  }

  const handleDateTo = (newDate) => {
    const date = formatISO(newDate, { representation: 'date' })
    const endYear = date.split('-')[0]
    const endMonth = date.split('-')[1]
    const endDay = date.split('-')[2]

    setDateTo({
      endYear,
      endMonth,
      endDay,
    })
    refetch({ queryKey: 'meals' })
  }

  return (
    <>
      <FilterBar>
        <ActionButton>
          <AscIcon />
        </ActionButton>
        <ActionButton>
          <DescIcon />
        </ActionButton>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <PickerWrapper>
            <DatePicker
              style={{ margin: '1rem' }}
              label="Date From"
              value={dateFrom}
              onChange={handleDateFrom}
              renderInput={(params) => {
                return <TextField {...params} />
              }}
            />
          </PickerWrapper>
          <PickerWrapper>
            <DatePicker
              style={{ margin: '1rem' }}
              label="Date To"
              value={dateTo}
              onChange={handleDateTo}
              renderInput={(params) => <TextField {...params} />}
            />
          </PickerWrapper>
        </LocalizationProvider>
      </FilterBar>
      <Header>{`Hi ${user.username}, here are your meals`}</Header>
      {isFetching && (
        <Spinner>
          <SpinIcon />
        </Spinner>
      )}
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

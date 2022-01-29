import React, { useEffect, useState } from 'react'

import { useAuth } from '../contexts/auth'
import { useMeals } from '../hooks/use-meals'

import { Meal } from '../components/Meal'

import { styled } from '../stitches.config'
import { keyframes } from '@stitches/react'

import TextField from '@mui/material/TextField'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import TimePicker from '@mui/lab/TimePicker'

import { SpinIcon } from '../components/icons/Spinner'
import { AscIcon } from '../components/icons/AscIcon'
import { DescIcon } from '../components/icons/DescIcon'
import { getTime, isValid } from 'date-fns'

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
  borderBottom: '0.1rem solid #808080',
  '@mobile': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'fit-content',
  },
})

const ActionButton = styled('button', {
  margin: '1.5rem 1.1rem',
  transition: '0.3s ease-in-out',
  fill: '#000000',
  '&:hover': {
    fill: '#008000',
  },
})

const PickerWrapper = styled('div', {
  margin: '1rem 1.5rem',
  '*': {
    margin: '0.4rem',
  },
  '@mobile': {
    margin: '0.5rem',
  },
})

export function Meals() {
  const [dateFrom, setDateFrom] = useState({
    value: null,
    date: '',
  })
  const [dateTo, setDateTo] = useState({
    value: null,
    date: '',
  })

  const [asc, setAsc] = useState(false)
  const [desc, setDesc] = useState(false)

  const query = { dateFrom, dateTo, asc, desc }

  const { user } = useAuth()
  const { data: meals, isFetching, isSuccess } = useMeals(user.id, query)

  const handleDateFrom = (newDate) => {
    try {
      const date = Math.floor(getTime(newDate) / 1000)

      setAsc(false)
      setDesc(false)
      if (isValid(date)) {
        setDateFrom({
          value: newDate,
          date,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDateTo = (newDate) => {
    try {
      const date = Math.floor(getTime(newDate) / 1000)

      setAsc(false)
      setDesc(false)
      if (isValid(date)) {
        setDateTo({
          value: newDate,
          date,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <FilterBar>
        <PickerWrapper>
          <ActionButton
            onClick={() => {
              setDesc(false)
              setAsc(true)
            }}
          >
            <AscIcon />
          </ActionButton>
          <ActionButton
            onClick={() => {
              setAsc(false)
              setDesc(true)
            }}
          >
            <DescIcon />
          </ActionButton>
        </PickerWrapper>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <PickerWrapper>
            <DatePicker
              label="Date From"
              value={dateFrom.value}
              onChange={handleDateFrom}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Date To"
              value={dateTo.value}
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
          {meals.map(({ id, name, calories, date }) => (
            <Meal key={id} meal={{ date, calories, name }} />
          ))}
        </MealsWrapper>
      )}
    </>
  )
}

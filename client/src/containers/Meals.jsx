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

import { SpinIcon } from '../components/icons/Spinner'
import { AscIcon } from '../components/icons/AscIcon'
import { DescIcon } from '../components/icons/DescIcon'
import { isValid } from 'date-fns'

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
  margin: '1rem 0.8rem',
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

const ClearFiltersButton = styled('button', {
  margin: '2rem 0.8rem',
  padding: '0.5rem',
  transition: '0.2s ease-in-out',
  borderRadius: '1rem',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#008000',
  },
})

export function Meals() {
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [asc, setAsc] = useState(false)
  const [desc, setDesc] = useState(false)

  const query = { dateFrom, dateTo, asc, desc }

  const { user } = useAuth()
  const { data: meals, isFetching, isSuccess } = useMeals(user.id, query)

  const handleDateFrom = (newDate) => {
    try {
      setAsc(false)
      setDesc(false)
      if (isValid(newDate)) {
        setDateFrom(newDate)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDateTo = (newDate) => {
    try {
      setAsc(false)
      setDesc(false)
      if (isValid(newDate)) {
        setDateTo(newDate)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClearFilter = () => {
    setAsc(false)
    setDesc(false)
    setDateFrom(null)
    setDateTo(null)
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
              value={dateFrom}
              onChange={handleDateFrom}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Date To"
              value={dateTo}
              onChange={handleDateTo}
              renderInput={(params) => <TextField {...params} />}
            />
          </PickerWrapper>
        </LocalizationProvider>
        <ClearFiltersButton onClick={handleClearFilter}>Clear Filters</ClearFiltersButton>
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

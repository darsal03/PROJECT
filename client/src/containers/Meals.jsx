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
import { getDay, getHours, getMinutes, getMonth, getYear, isValid } from 'date-fns'

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
    year: '',
    month: '',
    day: '',
  })
  const [dateTo, setDateTo] = useState({
    value: null,
    year: '',
    month: '',
    day: '',
  })
  const [timeFrom, setTimeFrom] = useState({
    value: null,
    hour: '',
    minute: '',
  })
  const [timeTo, setTimeTo] = useState({
    value: null,
    hour: '',
    minute: '',
  })
  const [asc, setAsc] = useState(false)
  const [desc, setDesc] = useState(false)

  const query = { dateFrom, dateTo, timeFrom, timeTo, asc, desc }

  const { user } = useAuth()
  const { data: meals, isFetching, isSuccess } = useMeals(user.id, query)

  const handleDateFrom = (newDate) => {
    try {
      const year = getYear(newDate)
      const month = getMonth(newDate) + 1
      const day = getDay(newDate)

      setAsc(false)
      setDesc(false)
      if (isValid(month) && isValid(year) && isValid(day)) {
        setDateFrom({
          value: newDate,
          year,
          month,
          day,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDateTo = (newDate) => {
    try {
      const year = getYear(newDate)
      const month = getMonth(newDate) + 1
      const day = getDay(newDate)

      setAsc(false)
      setDesc(false)
      if (isValid(month) && isValid(year) && isValid(day)) {
        setDateTo({
          value: newDate,
          year,
          month,
          day,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTimeFrom = (newTime) => {
    try {
      const hour = getHours(newTime)
      const minute = getMinutes(newTime)

      setAsc(false)
      setDesc(false)
      if (isValid(hour) && isValid(minute)) {
        setTimeFrom({
          value: newTime,
          hour,
          minute,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTimeTo = (newTime) => {
    try {
      const hour = getHours(newTime)
      const minute = getMinutes(newTime)

      setAsc(false)
      setDesc(false)
      if (isValid(hour) && isValid(minute)) {
        setTimeTo({
          value: newTime,
          hour,
          minute,
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
          <PickerWrapper>
            <TimePicker
              label="Time From"
              ampm={false}
              value={timeFrom.value}
              onChange={handleTimeFrom}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time To"
              ampm={false}
              value={timeTo.value}
              onChange={handleTimeTo}
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

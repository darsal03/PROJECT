import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'

import { Meal } from '../Meal'

const server = setupServer(
  rest.patch(`${process.env.REACT_APP_API_BASE_URL}/meals/*`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())

describe('Meal component', () => {
  const MockMeal = { id: 2, name: 'Test Meal', date: 1645811134000, calories: 200 }
  const queryClient = new QueryClient()

  it('renders default state when no meal prop is passed', () => {})

  it('renders meal details when meal prop is passed', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Meal meal={MockMeal} />
      </QueryClientProvider>
    )
    expect(screen.getByText(/test meal/i)).toBeInTheDocument()
    expect(screen.getByText(/calories = 200/i)).toBeInTheDocument()
    expect(screen.getByText(/eaten at : 21:45/i)).toBeInTheDocument()
  })

  it('renders edit mode when clicked on edit button and update button updates the meal', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Meal meal={MockMeal} />
        </LocalizationProvider>
      </QueryClientProvider>
    )

    expect(screen.queryByRole('button', { name: /cancel edit/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument()
    expect(screen.getByTestId(/editButton/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId(/editButton/i))

    expect(screen.queryByTestId(/editButton/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/name/i), ' with bread')

    expect(screen.getByLabelText(/name/i)).toHaveValue('Test Meal with bread')

    userEvent.click(screen.getByRole('button', { name: /update/i }))

    expect(screen.queryByRole('button', { name: /cancel edit/i })).not.toBeInTheDocument()
    expect(screen.getByText('Test Meal with bread')).toBeInTheDocument()
  })

  it('renders meal details when cancel button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Meal meal={MockMeal} />
        </LocalizationProvider>
      </QueryClientProvider>
    )

    userEvent.click(screen.getByTestId(/editButton/i))

    expect(screen.queryByTestId(/editButton/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel edit/i })).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: /cancel edit/i }))

    expect(screen.queryByRole('button', { name: /cancel edit/i })).not.toBeInTheDocument()
    expect(screen.getByTestId(/editButton/i)).toBeInTheDocument()
  })
})

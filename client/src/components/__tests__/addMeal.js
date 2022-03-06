import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../test-utils'
import { AddMeal } from '../AddMeal'
import * as mockAddMeal from '../../hooks/use-add-meal'

jest.mock('../../hooks/use-add-meal')

afterEach(() => jest.clearAllMocks())

describe('AddMeal', () => {
  it('renders default state', () => {
    const mutateFn = jest.fn()

    jest.spyOn(mockAddMeal, 'useAddMeal').mockReturnValue({
      mutate: mutateFn,
    })

    render(<AddMeal />)
    expect(screen.queryByLabelText('name')).not.toBeInTheDocument()
  })

  it('renders adding state and adds the meal', () => {
    const mutateFn = jest.fn()

    window.alert = jest.fn()

    jest.spyOn(mockAddMeal, 'useAddMeal').mockReturnValue({
      mutate: mutateFn,
    })

    render(<AddMeal />)

    userEvent.click(screen.getByRole('button'))

    const nameInput = screen.getByLabelText(/name/i)
    const calorieInput = screen.getByLabelText(/calories/i)
    const dateInput = screen.getByPlaceholderText(/mm\/dd\/yyyy hh:mm \(a\|p\)m/i)

    userEvent.clear(nameInput)
    userEvent.clear(calorieInput)

    userEvent.type(calorieInput, '300')
    userEvent.type(nameInput, 'my mock meal')
    userEvent.type(dateInput, '03/05/2021 05:31 pm')

    expect(nameInput).toHaveValue('my mock meal')
    expect(calorieInput).toHaveValue(300)

    userEvent.click(screen.getByText(/add/i))

    expect(mutateFn).toBeCalledTimes(1)
    expect(mutateFn).toBeCalledWith({ name: 'my mock meal', date: 1614951060000, calories: '300' })
  })

  it('returns to the default state when cancel clicked', () => {
    const mutateFn = jest.fn()

    jest.spyOn(mockAddMeal, 'useAddMeal').mockReturnValue({
      mutate: mutateFn,
    })

    render(<AddMeal />)

    userEvent.click(screen.getByRole('button'))

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByLabelText(/date/i)).not.toBeInTheDocument()
  })
})

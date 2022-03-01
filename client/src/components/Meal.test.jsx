import userEvent from '@testing-library/user-event'
import { screen, render } from '../test-utils'
import * as updateHookMock from '../hooks/use-update-meal'

import { Meal } from './Meal'

jest.mock('../hooks/use-update-meal')

const mealMock = {
  id: 'meal-id-1',
  name: 'Test Meal with bread',
  date: 1645811134000,
  calories: 200,
}

describe('Meal', () => {
  it('renders content', () => {
    // I should not be mocking this here.
    // Meal must be accepting onEdit prop so jest.mock above and this would not be needed any more
    const mutateFn = jest.fn()
    jest.spyOn(updateHookMock, 'useUpdateMeal').mockReturnValue({
      mutate: mutateFn,
    })

    render(<Meal meal={mealMock} />)

    expect(screen.getByText(mealMock.name)).toBeInTheDocument()
    expect(screen.getByText(/calories = 200/i)).toBeInTheDocument()
    expect(screen.getByText(/21:45/i)).toBeInTheDocument()
  })

  it('edits meal', () => {
    const mutateFn = jest.fn()

    jest.spyOn(updateHookMock, 'useUpdateMeal').mockReturnValue({
      mutate: mutateFn,
    })

    render(<Meal meal={mealMock} />)

    userEvent.click(screen.getByLabelText(/update meal/i))

    const nameInput = screen.getByLabelText(/name/i)
    expect(nameInput).toHaveValue('Test Meal with bread')
    userEvent.clear(nameInput)
    userEvent.type(nameInput, 'Test Meal with pasta')

    userEvent.click(screen.getByRole('button', { name: /update/i }))

    expect(mutateFn).toHaveBeenCalledWith({
      id: mealMock.id,
      name: 'Test Meal with pasta',
      date: mealMock.date,
      calories: mealMock.calories,
    })
  })
})

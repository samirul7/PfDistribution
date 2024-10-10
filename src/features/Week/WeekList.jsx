import styles from './WeekList.module.css'

import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import BeediInput from '../../components/BeediInput/BeediInput'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateWeekList,
  updateWeekListInput,
  updateWeekListLockStatus,
} from './weekSlice'

const WeekList = () => {
  const isLock = useSelector((state) => state.weekList.weekListLockStatus)
  const weekList = useSelector((state) => state.weekList.weekListInput)
  const totalBeedi = useSelector((state) => state.weekList.totalBeedi)
  const rate = useSelector((state) => state.rate.wage)
  const totalPf = (Number(totalBeedi) * Number(rate)) / 1000 / 10
  const [isDisabled, setIsDisabled] = useState(false)
  const dispatch = useDispatch()

  const handleAddWeek = (id) => {
    if (isLock) return

    const idx = id
      ? weekList.findIndex((week) => week.id === id)
      : weekList.length

    const leftSide = weekList.slice(0, idx + 1)
    const rightSide = weekList.slice(idx + 1)
    const newId = uuid()

    dispatch(
      updateWeekListInput([...leftSide, { id: newId, value: '' }, ...rightSide])
    )
  }

  const handleDeleteWeek = (id) => {
    if (isLock) return
    dispatch(updateWeekListInput(weekList.filter((week) => week.id !== id)))
  }

  const handleChange = (id, value) => {
    if (isLock) return

    dispatch(
      updateWeekListInput(
        weekList.map((week) => {
          if (week.id === id) return { ...week, value }
          return week
        })
      )
    )
  }

  const handleLock = () => {
    setIsDisabled(true)
    if (isLock) {
      dispatch(updateWeekListLockStatus(false))
      setIsDisabled(false)
      return
    }
    dispatch(updateWeekList(weekList))
    setIsDisabled(false)
  }

  return (
    <div className={styles.week}>
      <div className={styles.weekList}>
        {weekList.length !== 0 ? (
          weekList.map((week, idx) => (
            <BeediInput
              key={week.id}
              id={week.id}
              deleteInput={() => handleDeleteWeek(week.id)}
              addInput={() => handleAddWeek(week.id)}
              onChange={(event) => handleChange(week.id, event.target.value)}
              value={week.value}
              disabled={isLock}
            >
              Week {idx + 1}
            </BeediInput>
          ))
        ) : (
          <Button onClick={() => handleAddWeek()}>Add Week</Button>
        )}
      </div>
      {weekList.length !== 0 && (
        <Button onClick={handleLock} disabled={isDisabled}>
          {isLock ? 'Unlock' : 'Lock'}
        </Button>
      )}
      <div className={styles.beediPfView}>
        {isLock && (
          <>
            <p>Total Beedi: {totalBeedi}</p>
            <p>Pf Amount: {totalPf}</p>
          </>
        )}
      </div>
    </div>
  )
}
export default WeekList

import styles from './Rate.module.css'

import { useState } from 'react'
import { isNumber } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { updateRate, updateRateLockStatus } from './rateSlice'

const Rate = () => {
  const [wage, setWage] = useState('160')
  const [bonus, setBonus] = useState('42')
  const [isLock, setIsLock] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const dispatch = useDispatch()

  const handleLock = () => {
    setIsDisabled(true)
    if (isLock) {
      dispatch(updateRateLockStatus(false))
      setIsLock(false)
      setIsDisabled(false)
      return
    }
    if (!isNumber(wage)) {
      setIsDisabled(false)
      return
    }
    if (!isNumber(bonus)) {
      setIsDisabled(false)
      return
    }
    dispatch(
      updateRate({
        wage,
        bonus,
      })
    )
    setIsLock(true)
    setIsDisabled(false)
  }

  const handleChange = (name, value) => {
    if (!isNumber(value) && value !== '') return
    if (name === 'wage') setWage(value)
    if (name === 'bonus') setBonus(value)
  }

  return (
    <div className={styles.rateContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor='wage'>Wage</label>
        <input
          id='wage'
          type='number'
          disabled={isLock}
          value={wage}
          onChange={(e) => handleChange('wage', e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor='bonus'>Bouns</label>
        <input
          id='bonus'
          type='number'
          disabled={isLock}
          value={bonus}
          onChange={(e) => handleChange('bonus', e.target.value)}
        />
      </div>
      <button className={styles.btn} onClick={handleLock} disabled={isDisabled}>
        {isLock ? 'Unlock' : 'Lock'}
      </button>
    </div>
  )
}
export default Rate

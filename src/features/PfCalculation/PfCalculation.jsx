import styles from './PfCalculation.module.css'

import { useDispatch, useSelector } from 'react-redux'

import { getAllFromPf, getAllFromWage, isNumber } from '../../utils/helper'
import {
  updateIsPfSelected,
  updatePfCalculation,
  updatePfInput,
  updateWageInput,
} from '../Pf/pfSlice'

const PfCalculation = () => {
  const pfCalculation = useSelector((state) => state.pf.pfCalculation)
  const pfInput = useSelector((state) => state.pf.pfInput)
  const wageInput = useSelector((state) => state.pf.wageInput)
  const isPfSelected = useSelector((state) => state.pf.isPfSelected)

  const dispatch = useDispatch()

  const handleWageChange = (wage) => {
    if (isPfSelected) dispatch(updateIsPfSelected(false))
    if (!isNumber(wage) && wage !== '.' && wage !== '') return
    dispatch(updateWageInput(wage))
    if (wage === '' || wage === '.')
      return dispatch(updatePfCalculation(getAllFromWage('0')))
    const temp = getAllFromWage(wage)
    dispatch(updatePfCalculation(temp))
  }

  const handlePfChange = (pf) => {
    if (!isPfSelected) dispatch(updateIsPfSelected(true))
    if (!isNumber(pf) && pf !== '.' && pf !== '') return
    dispatch(updatePfInput(pf))
    if (pf === '' || pf === '.')
      return dispatch(updatePfCalculation(getAllFromPf('0')))
    const temp = updatePfCalculation(getAllFromPf(pf))
    dispatch(temp)
  }

  return (
    <div className={styles.pfCalculation}>
      <h3 className={styles.pfHeading}>PF Calculation</h3>
      <div className={styles.pfDetails}>
        <div className={styles.inputGroup}>
          <label htmlFor='wage'>Wages</label>
          <input
            type='number'
            id='wage'
            value={`${isPfSelected ? pfCalculation?.wage || '' : wageInput}`}
            onChange={(e) => handleWageChange(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='pf'>PF</label>
          <input
            type='number'
            id='pf'
            value={`${isPfSelected ? pfInput : pfCalculation?.pf || ''}`}
            onChange={(e) => handlePfChange(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            id='amount'
            disabled
            value={pfCalculation.amount || ''}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='bonus'>Bonus</label>
          <input
            type='number'
            id='bonus'
            disabled
            value={pfCalculation.bonus || ''}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor='paymentAmount'>Pay. Amount</label>
          <input
            type='number'
            id='paymentAmount'
            disabled
            value={pfCalculation.paymentAmount || ''}
          />
        </div>
      </div>
    </div>
  )
}
export default PfCalculation

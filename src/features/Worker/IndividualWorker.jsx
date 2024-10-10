import styles from './IndividualWorker.module.css'

import { useDispatch, useSelector } from 'react-redux'

import {
  getAllWeekBeediPfDistributionWithFormat,
  isNumber,
} from '../../utils/helper'
import { updatePfAmount, updatepfDistribution } from '../Pf/pfSlice'

const IndividualWorker = () => {
  const dispatch = useDispatch()

  const pfAmount = useSelector((state) => state.pf.pfAmount)
  const pfDistribution = useSelector((state) => state.pf.pfDistribution)
  const weekListLockStatus = useSelector(
    (state) => state.weekList.weekListLockStatus
  )
  const rateLockStatus = useSelector((state) => state.rate.rateLockStatus)

  const handleChange = (value) => {
    if (value !== '' && value !== '.' && !isNumber(value)) return
    dispatch(updatePfAmount(value))

    const pf = isNumber(value) ? Number(value) : 0

    if (pf === 0 || !weekListLockStatus || !rateLockStatus) {
      dispatch(updatepfDistribution([]))
      return
    }

    const temp_arr = getAllWeekBeediPfDistributionWithFormat(pf)
    dispatch(updatepfDistribution(temp_arr))
  }

  return (
    <div className={styles.individualWorker}>
      <div className={styles.inputGroup}>
        <label htmlFor='pfAmount'>PF amount</label>
        <input
          type='number'
          className={styles.input}
          id='pfAmount'
          value={pfAmount}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {pfDistribution.length !== 0 && (
        <div>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Week No.</th>
                <th>Total Beedi</th>
                <th>Wages</th>
                <th>Bonus</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pfDistribution.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.totalBeedi}</td>
                  <td>{item.totalWage}</td>
                  <td>{item.totalBonus}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default IndividualWorker

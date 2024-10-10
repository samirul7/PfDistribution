import styles from './GroupViewWorker.module.css'

import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'

const GroupViewWorker = ({ setEditMode }) => {
  const pfDistribution = useSelector((state) => state.pf.pfDistributionArray)
  return (
    <div className={styles.container}>
      <div className={styles.pfDistribution}>
        {pfDistribution.map((week, idx) => (
          <div key={week.id} className={styles.week}>
            <h3 className={styles.weekTitle}>Week {idx + 1}</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Pf Amount</th>
                  <th>Total Beedi</th>
                  <th>Wages</th>
                  <th>Bonus</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {week.value.map((worker, idx) => (
                  <tr key={worker.id}>
                    <td>{idx + 1}</td>
                    <td>{worker.pfAmount.toFixed(2)}</td>
                    <td>{worker.totalBeedi.toFixed(2)}</td>
                    <td>{worker.totalWage.toFixed(2)}</td>
                    <td>{worker.totalBonus.toFixed(2)}</td>
                    <td>{worker.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td>{week.total.pfAmount}</td>
                  <td>{week.total.totalBeedi}</td>
                  <td>{week.total.totalWage}</td>
                  <td>{week.total.totalBonus}</td>
                  <td>{week.total.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={setEditMode} hover rounded>
          Edit Mode
        </Button>
      </div>
    </div>
  )
}
export default GroupViewWorker

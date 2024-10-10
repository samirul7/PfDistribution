import styles from './App.module.css'

import { useState } from 'react'

import Rate from './features/Rate/Rate'
import IndividualWorker from './features/Worker/IndividualWorker'
import GroupWorker from './features/Worker/GroupWorker'
import { useSelector } from 'react-redux'
import PfCalculation from './features/PfCalculation/PfCalculation'
import WeekList from './features/Week/WeekList'

const App = () => {
  const [isIndividual, setIsIndividual] = useState(false)
  const [isPfCalculation, setIsPfCalculation] = useState(true)

  const rateLockStatus = useSelector((state) => state.rate.rateLockStatus)
  const weekListLockStatus = useSelector(
    (state) => state.weekList.weekListLockStatus
  )

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.heading}>PF Calculation|Distribution</h2>
      </div>
      <Rate />
      {rateLockStatus && (
        <>
          <div className={`${styles.btns} ${styles.bBottom}`}>
            <button
              className={`${styles.btn} ${
                isPfCalculation ? styles.active : ''
              }`}
              onClick={() => setIsPfCalculation(true)}
            >
              Pf Cal.
            </button>
            <button
              className={`${styles.btn} ${
                !isPfCalculation ? styles.active : ''
              }`}
              onClick={() => setIsPfCalculation(false)}
            >
              Pf Dist.
            </button>
          </div>
          {isPfCalculation ? (
            <PfCalculation />
          ) : (
            <>
              <WeekList />
              {weekListLockStatus && (
                <>
                  <div className={styles.btns}>
                    <button
                      className={`${styles.btn} ${
                        isIndividual ? styles.active : ''
                      }`}
                      onClick={() => setIsIndividual(true)}
                    >
                      Individual
                    </button>
                    <button
                      className={`${styles.btn} ${
                        !isIndividual ? styles.active : ''
                      }`}
                      onClick={() => setIsIndividual(false)}
                    >
                      Group
                    </button>
                  </div>
                  {isIndividual ? <IndividualWorker /> : <GroupWorker />}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
export default App

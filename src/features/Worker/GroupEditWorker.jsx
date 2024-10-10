import styles from './GroupEditWorker.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import { getPfDistributionForAllUsers, isNumber } from '../../utils/helper'
import { updatePfArray, updatepfDistributionArray } from '../Pf/pfSlice'
import PfInput from '../../components/PfInput/PfInput'
import Button from '../../components/Button/Button'

const GroupEditWorker = ({ setViewMode }) => {
  const dispatch = useDispatch()
  const pfArray = useSelector((state) => state.pf.pfArray)

  const deletePfInput = (id) => {
    const newPfArray = pfArray.filter((pf) => pf.id !== id)
    dispatch(updatePfArray(newPfArray))
  }

  const handleCalculate = () => {
    const pfDistribution = getPfDistributionForAllUsers(pfArray)
    dispatch(updatepfDistributionArray(pfDistribution))
    setViewMode()
  }

  const handleChange = (id, value) => {
    if (value !== '' && !isNumber(value)) return
    const newPfArray = pfArray.map((pf) =>
      pf.id === id ? { ...pf, value } : pf
    )
    dispatch(updatePfArray(newPfArray))
  }

  const addPfInput = (id) => {
    const idx = pfArray.findIndex((pf) => pf.id === id)
    const leftPfArray = pfArray.slice(0, idx + 1)
    const rightPfArray = pfArray.slice(idx + 1)
    const newPfArray = [
      ...leftPfArray,
      { id: uuid(), value: '' },
      ...rightPfArray,
    ]
    dispatch(updatePfArray(newPfArray))
  }

  const addRowsToPfArray = (num) => {
    const newArray = new Array(num)
      .fill({})
      .map(() => ({ id: uuid(), value: '' }))
    const newPfArray = [...pfArray, ...newArray]
    dispatch(updatePfArray(newPfArray))
  }
  return (
    <div>
      <div className={styles.inputContainer}>
        {pfArray.map((pf, idx) => (
          <PfInput
            key={pf.id}
            id={pf.id}
            slNo={idx + 1}
            deletePfInput={deletePfInput}
            addPfInput={addPfInput}
            pf={pf}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn} onClick={() => addRowsToPfArray(5)}>
          Add 5 rows
        </Button>
        {pfArray.length !== 0 && (
          <Button className={styles.btn} onClick={handleCalculate}>
            Calculate
          </Button>
        )}
      </div>
    </div>
  )
}

export default GroupEditWorker

import styles from './BeediInput.module.css'

import Button from '../Button/Button'

const BeediInput = ({
  children,
  deleteInput,
  addInput,
  id,
  onChange,
  value,
  disabled,
}) => {
  return (
    <div className={styles.beediInput}>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        type='number'
        id={id}
        className={styles.input}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <Button
        size='sm'
        color='blue'
        onClick={addInput}
        padding='padding_h_sm'
        disabled={disabled}
      >
        Add
      </Button>
      <Button size='sm' color='red' onClick={deleteInput} disabled={disabled}>
        Delete
      </Button>
    </div>
  )
}
export default BeediInput

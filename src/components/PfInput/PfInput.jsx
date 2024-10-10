import styles from './PfInput.module.css'

const PfInput = ({ id, slNo, addPfInput, deletePfInput, pf, onChange }) => {
  return (
    <div className={styles.pfInputContainer}>
      <div className={styles.slContainer}>
        <p>{slNo}</p>
      </div>
      <input
        type='number'
        className={styles.input}
        placeholder='Enter PF amount'
        value={pf.value}
        onChange={(e) => onChange(pf.id, e.target.value)}
      />
      <button
        className={`${styles.btn} ${styles.addBtn}`}
        onClick={() => addPfInput(id)}
      >
        Add
      </button>
      <button
        className={`${styles.btn} ${styles.deleteBtn}`}
        onClick={() => deletePfInput(id)}
      >
        Delete
      </button>
    </div>
  )
}
export default PfInput

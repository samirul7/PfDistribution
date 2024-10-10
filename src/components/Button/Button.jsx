import styles from './Button.module.css'

const Button = ({
  children,
  type,
  appearance,
  onClick,
  size,
  color,
  padding,
  disabled,
  hover,
  rounded,
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[appearance]} ${styles[size]} ${
        styles[color]
      } ${styles[padding]} ${hover ? styles.hover : ''} ${
        rounded ? styles.rounded : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button

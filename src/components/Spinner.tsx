import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div className={styles['lds-ripple']} aria-label="loading...">
      <div />
      <div />
    </div>
  )
}

export default Spinner

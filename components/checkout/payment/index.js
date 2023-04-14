import styles from './payment.module.scss'
import { paymentMethods } from '../../../data/paymentMethods'

export default function Payment({ paymentMethod, setPaymentMethod, profile }) {
  return (
    <div className={styles.payment}>
      {!profile &&
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      }
      {
        paymentMethods.map((payment) => (
          <label
            htmlFor={payment.id}
            key={payment.id}
            className={styles.payment__item}
            onClick={() => setPaymentMethod(payment.id)}
            style={{
              background: `${paymentMethod === payment.id ? '#f5f5f5' : ''}`
            }}
          >
            <input 
              type="radio" 
              name="payment" 
              id={payment.id} 
              checked={paymentMethod === payment.id}
              onChange={() => setPaymentMethod(payment.id)}
            />
            <img 
              src={`/images/checkout/${payment.id}.webp`}
              alt={payment.name} 
            />
            <div className={styles.payment__item_col}>
              <span>Pay with {payment.name}</span>
              <p>
                {
                  payment.images.length > 0 
                  ? payment.images.map((img, index) => (
                    <img 
                      src={`/images/payment/${img}.webp`} 
                      alt="" 
                      key={index}
                    />
                  ))
                  : payment.description
                }
              </p>
            </div>
          </label>
        )) 
      }
    </div>
  )
}

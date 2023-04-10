import { Pagination } from '@mui/material'
import { useState } from 'react'
import usePagination from './Pagination'
import Review from './Review'
import styles from './reviews.module.scss'
import TableHeader from './TableHeader'

export default function Table({ reviews, allSizes, colors }) {
  const [page, setPage] = useState(1)
  const PER_PAGE = 3
  const count = Math.ceil(reviews.length/ PER_PAGE)
  const _DATA = usePagination(reviews, PER_PAGE)

  const handleChange = (e, p) => {
    setPage(p)
    _DATA.jump(p)
  }

  return (
    <div className={styles.table}>
      <TableHeader
        reviews={reviews} 
        allSizes={[{size: 'All'}, ...allSizes]}
        colors={[{color: 'All', image: ''}, ...colors]}
      />
      <div className={styles.table_data}>
        {
          _DATA.currentData().map((review, index) => {
            return (
              <Review key={index} review={review}/>
            )
          })
        }
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          variant='round'
          shape='rounded'
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

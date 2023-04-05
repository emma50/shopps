import axios from 'axios'

export const uploadImages = async (formData) => {
  const res = await axios.post('/api/cloudinary',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  console.log('RESDATA--->', res)
  const data = res.data
  return data
}
import axios from 'axios'

export const uploadImages = async (formData) => {
  const { data } = await axios.post('/api/cloudinary',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  
  return data
}
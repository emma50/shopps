import axios from 'axios'

export const uploadImages = async (formData) => {
  const { data } = await axios.post('/api/cloudinary', {
    path: 'products',
    files: formData
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
import axios from "axios";

export const saveCart = async (cart, userId) => {
  try {
    const { data } = await axios.post('/api/user/saveCart', {
      cart,
      userId
    })
    return data
  } catch(e) {
    return response.data.e.message
  }
}

export const saveAddress = async (address, userId) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address,
      userId
    })
    return data
  } catch(e) {
    return response.data.e.message
  }
}
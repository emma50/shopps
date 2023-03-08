import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post('/api/user/saveCart', {
      cart
    })
    return data
  } catch(e) {
    return response.data.e.message
  }
}

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address
    })
    return data
  } catch(e) {
    return response.data.e.message
  }
}
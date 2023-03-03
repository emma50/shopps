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
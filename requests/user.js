import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post('/api/user/saveCart', {
      cart
    })
    return data
  } catch(e) {
    return e.response.data.message
  }
}

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address
    })
    
    return data
  } catch(e) {
    return e.response.data.message
  }
}

export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put('/api/user/manageAddress', {
      id
    })
    
    return data
  } catch(e) {
    return e.response.data.message
  }
}

export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete('/api/user/manageAddress', {
      data: { id }
    })
  
    return data
  } catch(e) {
    return e.response.data.message
  }
}
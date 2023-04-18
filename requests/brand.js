import axios from 'axios'
import fs from 'fs'

export const getBrandImage = async (brand) => {
  const url = "https://api.brandfetch.io/v2/brands"

  const { data } = await axios.get(`${url}/${brand.toLowerCase()}.com`, { 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BRAND_KEY}`
    }
  })

  return data.logos[0].formats[0].src
}

export const getBrandImageExt = (src) => {
  const arr = src.split('.')

  return arr[arr.length - 1]
}

export const downloadImage = async (url, filepath) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  })

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath))
  })
}
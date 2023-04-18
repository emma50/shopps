import sharp from 'sharp'

export const svgToPng = async (file, newFile) => {
  const data= await sharp(file)
    .png()
    .toFile(newFile)
    
  return data
}
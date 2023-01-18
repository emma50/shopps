import mongoose from "mongoose";

const connection = {
  isConnected: 0
}

async function connectDB () {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      console.log('Use previous connection to the database')
      return;
    }
    await mongoose.disconnect()
  }

  mongoose.set('strictQuery', true)
  const db = await mongoose.connect(process.env.MONGODB_URI)
  console.log('A new connection to the database was made')
  connection.isConnected = db.connections[0].readyState
}

async function disconnectDB () {
  if (connection.isConnected) {
   if (process.env.NODE_ENV === 'production') {
    await mongoose.disconnect()
    console.log('Disconnecting from database when in production environment ')
   }
   else {
    console.log('Would not disconnect from database when not in production mode')
   }
  }
}

const db = {
  connectDB,
  disconnectDB
}

export default db
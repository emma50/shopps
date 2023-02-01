import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import bcrypt from 'bcrypt'
import clientPromise from './lib/mongodb'
import User from '../../../models/user'
import db from '../../../utils/db';

db.connectDB()

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise), 
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your email" },
        password: { label: "Password", type: "password", placeholder: "your password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials
        const user = await User.findOne({ email })
        console.log(user, 'USERRRRRRRRRRRRR')
        
        if (user) {
          return signinUser({ password, user })
        } else {
          throw new Error('This email does not exist')
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub)

      session.user.id = token.sub || user._id.toString()
      session.user.role = user.role || 'user'

      return session
    }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
})

export const signinUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password')
  }

  const textPassword = await bcrypt.compare(password, user.password)

  if (!textPassword) {
    throw new Error('Please enter correct email or password')
  }

  return user
}
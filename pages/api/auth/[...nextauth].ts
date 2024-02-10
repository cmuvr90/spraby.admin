import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {findByEmail} from "@/services/Users";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Username", type: "text", placeholder: "email"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials, req) {
        const {email, password} = credentials as any;

        if (email && password) {
          const user = await findByEmail(email);
          if (!user) return null;

          const bcrypt = require('bcrypt');
          const isCorrect = await bcrypt.compare(password, user.password);
          if (!isCorrect) return null;

          return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({session, token, user}) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  }
}
export default NextAuth(authOptions)

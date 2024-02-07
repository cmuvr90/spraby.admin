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
          try {
            const user = await findByEmail(email);
            if (!user || user.password !== password) return null;  //@todo FIX

            return {
              ...user
            }

          } catch (e) {
            console.log(e);
          }
        }
        return null
      }
    })
  ],

  callbacks: {
    async jwt({token, user}) {

      console.log(`[jwt] token = ${token}, user = `, user)

      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({session, token}) {

      console.log(`[session] token=${token}`, session)

      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session
    }
  },

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/login"
  }
}
export default NextAuth(authOptions)

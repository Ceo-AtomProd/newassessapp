import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import dbConnect from "@/libs/db";
await dbConnect();
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token }) {
      const user = await User.findOne({ email:token.email })
      if (user) {
        token.role = user.role
        token.id = user.id
      }else{
        token.role = "unauthorized"
      }
      return token
    },
    async signIn({ user, account }) {
      const { email, image, name } = user;
      if (account.provider === "google") {
        try {
         
          const existngUser = await User.findOne({ email });
          if (!existngUser) {
            await new User({
              email,
              name,
              image,
            }).save();
          }
          else{
            await User.findOneAndUpdate({email}, {
              $set: {
                name,
                image,
                email
              }
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
    async session({ session }) {
      const user = await User.findOne({ email:session.user.email })
      if (user) {
        session.user.role = user.role
        session.user.id = user.id
      }else {
        session.user.role = 'unauthorized'
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url === '/api/auth/signout') {
        return `${baseUrl}`
      }
      if (url === 'api/auth/signin') {
        return `${baseUrl}`
      }
      else {
        return `${baseUrl}`
      }
    }
  },

};

export default NextAuth(authOptions);

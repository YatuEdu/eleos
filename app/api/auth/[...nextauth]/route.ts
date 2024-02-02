import { authOptions }    from "@/lib/server/utilities/sec/authOptions"
import NextAuth           from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
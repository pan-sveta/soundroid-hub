import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Discord from "next-auth/providers/discord";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
    ],
}
export default NextAuth(authOptions)
const config = {
  env: process.env.NODE_ENV,
  appUrl:
    process.env.NEXT_PUBLIC_APP_URL ??
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  server: {
    url: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  auth: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    providers: {
      github: {
        id: process.env.GITHUB_ID,
        secret: process.env.GITHUB_SECRET,
      },
    },
  },
}

export default config

const config = {
  env: process.env.NODE_ENV,
  server: {
    url: process.env.SERVER_URL,
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

export const routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  authCallback: '/auth/callback',
  portfolio: '/portfolio',
  topic: {
    create: (id: number | string) => `/topics/${id}/create`,
    detail: (id: number | string) => `/topics/${id}/detail`,
  }
}
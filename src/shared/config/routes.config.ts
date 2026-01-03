export const routes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  authCallback: '/auth/callback',
  portfolio: '/portfolio',
  topic: {
    create: (id: number | string) => `/topic/${id}/create`,
    detail: (id: number | string) => `/topic/${id}/detail`,
  }
}
import router from '@/router';

export default function authGuard(store) {
  const firstLogin = 'FirstLoginSettings';
  const authRoutes = ['Login', 'ForgotPassword', 'SignUp'];
  router.beforeEach((to, from, next) => {
    if (authRoutes.includes(to.name) && store.state.auth.isLoggedIn) {
      return next({ name: 'Home' });
    }
    if (!authRoutes.includes(to.name) && !store.state.auth.isLoggedIn) {
      return next({ name: 'Login' });
    }
    if (firstLogin === to.name && !store.state.auth.isFirstLogin) {
      console.log('redirect', store.state.auth.isFirstLogin);
      return next({ name: 'Home' });
    }
    return next();
  });
}

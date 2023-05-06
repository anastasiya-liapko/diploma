import { AuthApi } from "@/api/AuthApi";
import { Auth } from "@/domain/Auth/Auth";
import { IDtoToken } from "@/domain/Token/DtoToken.interface";
import { useAuthStore } from "@/store/auth";

export default () => {
  const authStore = useAuthStore();
  const authApi = new AuthApi();

  const authSuccess = (creds: IDtoToken) => {
    localStorage.setItem('os_at', creds.token);
    localStorage.setItem('os_rt', creds.refreshToken);
    authStore.isAuthorized = true;
  }

  const authError = () => {
    authStore.isAuthorized = false;
  }

  const unauthSuccess = () => {
    localStorage.removeItem('os_at');
    localStorage.removeItem('os_rt');
    authStore.isAuthorized = false;
  }

  const register = async (creds: Auth) => {
    try {
      const res = await authApi.register(creds)
      authSuccess(res.data);
      return true
    } catch (e: any) {
      authError();
      return false
    }
  }

  const login = async (creds: Auth) => {
    try {
      const res = await authApi.login(creds)
      authSuccess(res.data);
      return true
    } catch (e: any) {
      console.log(e?.response?.status === 401)
      if (e?.response?.status === 401) {
        return await register(creds);
      }
      authError();
      return false
    }
  }

  const logout = async () => {
    // let creds = {
    //   login: store.state.userCreds.login,
    //   refreshToken: localStorage.getItem('bmsAdminRefresh')
    // }
    // try {
    //   await authApi.logout(creds)
    // } catch (e) {
    //   console.log(e)
    // } finally {
    //   store.commit('UNAUTH_SUCCESS')
    // }
    // router.push('/login')
    // store.commit('RESET_STATE')
    // store.commit('RESET_REGISTER_MODULES')
  }

  return {
    login,
    logout
  }
};
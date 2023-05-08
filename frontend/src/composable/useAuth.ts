import { AuthApi } from "@/api/AuthApi";
import { Auth } from "@/domain/Auth/Auth";
import { Unauth } from "@/domain/Auth/Unauth";
import { IDtoToken } from "@/domain/Token/DtoToken.interface";
import { useAuthStore } from "@/store/auth";

export default () => {
  const authStore = useAuthStore();
  const authApi = new AuthApi();

  const authSuccess = (creds: IDtoToken): void => {
    localStorage.setItem('os_at', creds.token);
    localStorage.setItem('os_rt', creds.refreshToken);
    authStore.isAuthorized = true;
  }

  const authError = (): void => {
    authStore.isAuthorized = false;
  }

  const unauthSuccess = () => {
    localStorage.removeItem('os_at');
    localStorage.removeItem('os_rt');
    authStore.isAuthorized = false;
  }

  const register = async (creds: Auth): Promise<boolean> => {
    try {
      const res = await authApi.register(creds)
      authSuccess(res.data);
      return true
    } catch (e: any) {
      authError();
      return false
    }
  }

  const login = async (creds: Auth): Promise<boolean> => {
    try {
      const res = await authApi.login(creds)
      authSuccess(res.data);
      return true
    } catch (e: any) {
      if (e?.status === 404) {
        return await register(creds);
      }
      authError();
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout(new Unauth(localStorage.getItem('os_rt')))
    } catch (e) {
      console.log(e)
    } finally {
      unauthSuccess()
    }
  }

  return {
    login,
    logout
  }
};
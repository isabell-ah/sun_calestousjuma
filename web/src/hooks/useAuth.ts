import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { api } from '@/lib/api';

export const useAuth = () => {
  const { user, setUser, isAuthenticated } = useAppStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        setUser(null);
      }
    };

    // Check auth on mount
    checkAuth();

    // Check for auth success from OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'success') {
      checkAuth();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setUser]);

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      // Redirect to home page immediately after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear user and redirect
      setUser(null);
      window.location.href = '/';
    }
  };

  return {
    user,
    isAuthenticated,
    logout
  };
};
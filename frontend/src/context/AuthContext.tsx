'use client';

import axiosInstance from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { API_PATHS } from '@/lib/paths';
import toast from 'react-hot-toast';

interface User {
  _id?: string;
  username: string;
  role: string;
  email: string;
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: {
    token: string;
    user: User;
  }) => Promise<void>;
  clearUser: () => void;
  signup: (credentials: { username: string; email: string; password: string; admintoken?: string }) => Promise<void>;
  updateProfile: (file: File) => Promise<void>;
  isUpdatingProfile: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setisUpdatingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
   console.log('Token:', token);
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data.user);
        console.log('User fetched:', response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = async ({token , user}: {
    token: string;
    user : User;
  }) => {
    localStorage.setItem('token', token);
    setUser(user);
    setLoading(false);
  };

  const clearUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false);
  };

  const signup = async ({
    username,
    email,
    password,
    adminInviteToken,
  }: {
    username: string;
    email: string;
    password: string;
    adminInviteToken?: string;
  }) => {

    try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      username,
      email,
      password,
      adminInviteToken,
    });

    const { token, user } = response.data;
   
    if(token){
      updateUser({token,user});

      if(user.role === 'admin'){
        router.push('/admin/dashboard');
      }else{
        router.push('/User/UserDashboard');
      }
    }

  } catch (error) {
    console.error('Register failed:', error);
    throw error;
  }

  }

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log('Login response:', response.data);  

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem('token', token);
        setUser(user);

        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push('/auth/login');
  };



  const updateProfile = async (file:File) => {
    setisUpdatingProfile(true);
    try {

      const formData = new FormData();
      formData.append("profileImageUrl", file);
      const res = await axiosInstance.put("/api/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser(res.data.user);
     console.log("res.data",res.data);

      // toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error('An error occurred');
    } finally {
      setisUpdatingProfile(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, updateUser, signup,clearUser,updateProfile, isUpdatingProfile }}
    >
      {children}
   
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

'use client';

import { useMutation } from '@tanstack/react-query';

import { useForm } from "react-hook-form";
import { signupSchema } from '@/app/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  // const router = useRouter();
  const { signup } = useAuth();

  const { mutate } = useMutation({
    mutationFn: signup,
    // onSuccess: () => router.push('/login'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
    adminInviteToken?: string;
  }) => {
    console.log('Form data:', data);
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          {...register("username")}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}

        <input
          {...register("adminInviteToken")}
          type="text"
          placeholder="Admin Token (optional)"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 transition text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

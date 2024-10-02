"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/components/ui/toast";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/Auth";
import { getErrorMessage } from "@/utils/errorHandler";
import { useLogin } from "@/hooks/user/useLoginUser";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      login(response.accessToken, response.user);
      router.push("/subjects");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = getErrorMessage(error);
      showCustomToast(errorMessage);
    }
  };

  const inputClassName = "h-[70px] p-6";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center mb-2">Welcome Back 👋</h1>
        <p className="text-gray-500 text-center mb-6">
          Kindly login with necessary credentials and access to your dashboard
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <p className="font-medium">LOGIN</p>
          <Input
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            className={inputClassName}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className={inputClassName}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full h-[70px]"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging In..." : "Continue"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

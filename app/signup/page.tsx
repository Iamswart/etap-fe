"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogBox } from "@/components/dialog-box";
import { SuccessMessage } from "@/components/success-message";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/user/useRegisterUser";
import { showCustomToast } from "@/components/ui/toast";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/contexts/Auth";
import Link from "next/link";
import { getErrorMessage } from "@/utils/errorHandler";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { login } = useAuth();
  const registerMutation = useRegister();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await registerMutation.mutateAsync(data);
      login(response.accessToken, response.user);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = getErrorMessage(error);
      showCustomToast(errorMessage);
    }
  };

  const handleProceed = () => {
    setShowSuccessDialog(false);
    router.push("/subjects");
  };

  const inputClassName = "h-[70px] p-6";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Get Started</h1>
        <p className="text-gray-500 text-center mb-6">
          Complete signup on ETAP Learning App
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <p className="font-medium">PERSONAL INFORMATION</p>
          <Input
            placeholder="Enter Full Name"
            {...register("name")}
            className={inputClassName}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

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
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
      <DialogBox
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      >
        <SuccessMessage
          title="Success"
          message="Account registration complete"
          onProceed={handleProceed}
        />
      </DialogBox>
    </div>
  );
};

export default SignUpPage;

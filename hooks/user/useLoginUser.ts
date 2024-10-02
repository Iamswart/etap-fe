import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { RoleEnum } from "@/constants/type";

const loginApiClient = new APIClient("/auth/login");

export interface LoginInput {
  email: string;
  password: string;
};

interface LoginResponse  {
  user: {
    id: string;
    name: string;
    email: string;
    role: RoleEnum;
  };
  accessToken: string;
};

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginInput>(
      ['LOGIN_USER'], 
      (input: LoginInput) => loginApiClient.post<LoginInput, LoginResponse>(input)
    );
  };
  
  
  
  
  

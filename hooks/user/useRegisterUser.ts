import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { RoleEnum } from "@/constants/type";

const authApiClient = new APIClient("/auth/register");

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
};

interface RegisterResponse  {
  user: {
    id: string;
    name: string;
    email: string;
    role: RoleEnum;
  };
  accessToken: string;
};

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterInput>(
      ['REGISTER_USER'], 
      (input: RegisterInput) => authApiClient.post<RegisterInput, RegisterResponse>(input)
    );
  };
  
  
  
  
  

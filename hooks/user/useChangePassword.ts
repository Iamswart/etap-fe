import { useMutation } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const changePasswordApiClient = new APIClient("/auth/change-password");

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  status: string;
  message: string;
}

export const useChangePassword = () => {

  return useMutation<ChangePasswordResponse, Error, ChangePasswordInput>(
    ["CHANGE_PASSWORD"],
    (input: ChangePasswordInput) => {
      return changePasswordApiClient.post<
        ChangePasswordInput,
        ChangePasswordResponse
      >(input);
    }
  );
};

export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.errorMessage) {
    return error.response.data.errorMessage;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
};

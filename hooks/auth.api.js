import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const login = async (values) => {
  const response = await axiosClient.post("login", values);
  return response;
};

const useLogin = () => {
  const mutationConfig = {
    mutationFn: (values) => login(values),
  };

  return useMutation(mutationConfig);
};

const register = async (values) => {
  const response = await axiosClient.post("register", values);
  return response;
};

const useRegister = () => {
  const mutationConfig = {
    mutationFn: (values) => register(values),
  };

  return useMutation(mutationConfig);
};

export { useLogin, useRegister };

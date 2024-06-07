import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const fetchAdminModels = async () => {
  const parsed = await axiosClient.get("admins");
  return parsed.data;
};

const useAdminModels = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: () => fetchAdminModels(),
  });

const fetchAdminModel = async (adminId) => {
  const parsed = await axiosClient.get(`admins/${adminId}`);
  return parsed.data;
};

const useGetAdminModel = (adminId) =>
  useQuery({
    queryKey: ["admins", adminId],
    queryFn: () => fetchAdminModel(adminId),
  });

const createAdminModel = async (values) => {
  const response = await axiosClient.post("admins", values);
  return response;
};

const useCreateAdminModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createAdminModel(values),
  };

  return useMutation(mutationConfig);
};

const updateAdminModel = async ({ adminId, values }) => {
  const response = await axiosClient.post(
    `admins/${adminId}?_method=PUT`,
    values
  );
  return response;
};

const useUpdateAdminModel = () => {
  const mutationConfig = {
    mutationFn: ({ adminId, values }) => updateAdminModel({ adminId, values }),
  };

  return useMutation(mutationConfig);
};

const deleteAdminModel = async (adminId) => {
  const response = await axiosClient.delete(`admins/${adminId}`);
  return response;
};

const useDeleteAdminModel = () => {
  const mutationConfig = {
    mutationFn: (adminId) => deleteAdminModel(adminId),
  };

  return useMutation(mutationConfig);
};

export {
  useDeleteAdminModel,
  useUpdateAdminModel,
  useAdminModels,
  useCreateAdminModel,
  useGetAdminModel,
};

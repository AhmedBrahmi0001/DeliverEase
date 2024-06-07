import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseMutationOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosClient from "../axiosClient";

const fetchPaymentModels = async () => {
  const parsed = await axiosClient.get("payments");
  return parsed.data;
};

const usePaymentModels = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: () => fetchPaymentModels(),
  });

const fetchPaymentModel = async (paymentId) => {
  const parsed = await axiosClient.get(`payments/${paymentId}`);
  return parsed.data;
};

const useGetPaymentModel = (paymentId) =>
  useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => fetchPaymentModel(paymentId),
  });

const createPaymentModel = async (values) => {
  const response = await axiosClient.post("payments", values);
  return response;
};

const useCreatePaymentModel = () => {
  const mutationConfig = {
    mutationFn: (values) => createPaymentModel(values),
  };

  return useMutation(mutationConfig);
};

const updatePaymentModel = async ({ paymentId, values }) => {
  const response = await axiosClient.post(
    `payments/${paymentId}?_method=PUT`,
    values
  );
  return response;
};

const useUpdatePaymentModel = () => {
  const mutationConfig = {
    mutationFn: ({ paymentId, values }) =>
      updatePaymentModel({ paymentId, values }),
  };

  return useMutation(mutationConfig);
};

const deletePaymentModel = async (paymentId) => {
  const response = await axiosClient.delete(`payments/${paymentId}`);
  return response;
};

const useDeletePaymentModel = () => {
  const mutationConfig = {
    mutationFn: (paymentId) => deletePaymentModel(paymentId),
  };

  return useMutation(mutationConfig);
};

export {
  useDeletePaymentModel,
  useUpdatePaymentModel,
  usePaymentModels,
  useCreatePaymentModel,
  useGetPaymentModel,
};

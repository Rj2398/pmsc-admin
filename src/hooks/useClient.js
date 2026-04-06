import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../utils/api";
import { KEYS } from "../config/constant";
import { setUserInfo } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function useClient(searchValue) {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const { mutateAsync: addClient } = useMutation({
    mutationKey: ["addClient", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        setManualLoading(true);
        const response = await api.post("save-client", payload);
        const { data } = response;

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const { mutateAsync: updateClient } = useMutation({
    mutationKey: ["updateClient", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        setManualLoading(true);
        const response = await api.post("update-client", payload);
        const { data } = response;

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const { mutateAsync: getClientById } = useMutation({
    mutationKey: ["getClient", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        // setManualLoading(true);
        const response = await api.post("get-client", payload);
        const { data } = response;

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        toast.error(error.message);
      } finally {
        // setManualLoading(false);
      }
    },
  });

  //
  const {
    data: getClientList,
    // isLoading: getLoadingList,
    refetch: refetchLoadingList,
  } = useQuery({
    queryKey: ["getClientList"],
    queryFn: async () => {
      try {
        setManualLoading(true);
        const response = await api.get(`get-client-list`);
        const { data } = response;
        return data.data;
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "An unknown error occurred";

        if (error?.response?.data?.message === "Unauthenticated.") {
          LogoutError();
        }

        toast.error(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  //update-Status

  // const {
  //   data: searchClient,
  //   isLoading: getSearchClient,
  //   refetch: refetchClient,
  // } = useQuery({
  //   queryKey: ["searchClient", searchValue],
  //   queryFn: async () => {
  //     try {
  //       const response = await api.get(
  //         `search-client?searchterm=${searchValue}`
  //       );
  //       const { data } = response;
  //       return data.data;
  //     } catch (error) {
  //       const errorMessage =
  //         error?.response?.data?.message ||
  //         error.message ||
  //         "An unknown error occurred";

  //       if (error?.response?.data?.message === "Unauthenticated.") {
  //         LogoutError();
  //       }

  //       toast.error(errorMessage);
  //       throw new Error(errorMessage);
  //     }
  //   },
  //   staleTime: 1000 * 60 * 5,
  //   cacheTime: 1000 * 60 * 10,
  //   refetchOnWindowFocus: false,
  // });

  const { mutateAsync: deleteClient } = useMutation({
    mutationKey: ["delete-client", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        // setManualLoading(true);
        const response = await api.post("delete-client", payload);
        const { data } = response;

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setManualLoading(false);
      }
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationKey: ["update-client-status", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        // setManualLoading(true);
        const response = await api.post("update-client-status", payload);
        const { data } = response;

        return {
          ...data,
          message: data?.message,
        };
      } catch (error) {
        toast.error(error.message);
      } finally {
        // setManualLoading(false);
      }
    },
  });

  const isLoading = manualLoading;

  return {
    isLoading,
    addClient,
    updateClient,
    getClientById,
    deleteClient,
    getClientList,
    // getLoadingList,
    refetchLoadingList,
    updateStatus,
    // searchClient,
    // getSearchClient,
    // refetchClient,
  };
}

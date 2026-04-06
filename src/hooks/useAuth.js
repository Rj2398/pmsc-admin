import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../utils/api";
import { KEYS } from "../config/constant";
import { setUserInfo } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const dispatch = useDispatch();
  const [manualLoading, setManualLoading] = useState(false);

  const { mutateAsync: salesAdminLogin } = useMutation({
    mutationKey: ["salesAdminLogin", "SalesAdmin"],
    mutationFn: async (payload) => {
      try {
        // setManualLoading(true);
        const response = await api.post("sales-admin-login", payload);
        const { data } = response;
        const accessToken = data?.user?.token;
        const userId = data?.user?.id;

        if (accessToken && userId) {
          localStorage.setItem(KEYS.USER_INFO, JSON.stringify(data.user));

          dispatch(setUserInfo(data?.user));
        }

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
    salesAdminLogin,
  };
}

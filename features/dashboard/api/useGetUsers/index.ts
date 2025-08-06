"use client"

import { useQuery } from "@tanstack/react-query"

import { post } from "@/services/helper"
import { DASHBOARD_URL } from "@/services/urls"

type Props = object

export function useGetUsers(params: Props) {
  const usersApi = (payload: Props) =>
    post(DASHBOARD_URL.GET_USERS, payload, {})

  return useQuery({
    queryKey: ["users", params],
    queryFn: () => usersApi(params),
    select: (response) => {
      if (response.success) {
        return response.details
      }
    },
  })
}

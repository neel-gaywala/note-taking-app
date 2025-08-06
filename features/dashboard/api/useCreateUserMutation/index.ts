"use client"

import { useMutation } from "@tanstack/react-query"

import { useInvalidateQueries } from "@/hooks"
import { post } from "@/services/helper"
import { DASHBOARD_URL } from "@/services/urls"

type Props = object

export function useCreateUserMutation() {
  const { invalidateQueries } = useInvalidateQueries()
  const proceedSavePost = (payload: Props) =>
    post(DASHBOARD_URL.GET_USER_DETAILS, payload, {})

  return useMutation({
    mutationFn: proceedSavePost,
    onSuccess: () => {
      invalidateQueries(["post-details"])
    },
  })
}

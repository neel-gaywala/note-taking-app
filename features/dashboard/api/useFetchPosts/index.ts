import { useEffect, useState } from "react"

import { postFetch } from "@/services/helper"
import { DASHBOARD_URL } from "@/services/urls"

type GetPostPayload = {
  page: number
  limit: number
}

type PostsResponse = {
  success: true
  details: {
    id: string
    title: string
  }[]
}

export const useFetchPosts = (
  params: GetPostPayload = { page: 1, limit: 10 }
) => {
  const [data, setData] = useState<PostsResponse["details"] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const result = await postFetch<GetPostPayload, PostsResponse>(
        DASHBOARD_URL.GET_USER_DETAILS,
        params
      )

      if (result.success) {
        setData(result.data.details)
      } else {
        setError(result.error_message)
      }

      setLoading(false)
    }

    fetchData()
  }, [params])

  return { data, error, loading }
}

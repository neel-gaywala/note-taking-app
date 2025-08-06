export const SERVER = process.env.NEXT_PUBLIC_API_URL

export const API_VERSION = "/api/v1"

export const DASHBOARD_URL = {
  GET_USERS: `${API_VERSION}/admin/getUsers`,
  GET_USER_DETAILS: `${API_VERSION}/admin/get-user-details`,
} as const

export const AUTH_URL = {
  LOGIN: `${API_VERSION}/auth/login`,
  REGISTER: `${API_VERSION}/auth/register`,
} as const

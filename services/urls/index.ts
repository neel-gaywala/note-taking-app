export const SERVER =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const API_VERSION = "/api/";

export const BASE_URL = `${SERVER}${API_VERSION}`;

export const NOTE_URL = `${BASE_URL}/notes`;

export const DASHBOARD_URL = {
  GET_USERS: `${API_VERSION}/admin/getUsers`,
  GET_USER_DETAILS: `${API_VERSION}/admin/get-user-details`,
} as const;

export const AUTH_URL = {
  LOGIN: `${API_VERSION}/auth/login`,
  REGISTER: `${API_VERSION}/auth/register`,
} as const;

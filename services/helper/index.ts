import { proceedLogout, store } from "@/redux-store/store";
import axios from "axios";

import { SERVER } from "@/services/urls";

const axiosApi = axios.create({
  baseURL: SERVER,
  timeout: 240000,
  withCredentials: true,
});

axiosApi.interceptors.request.use((config) => {
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        store.dispatch(
          proceedLogout({
            onSuccess: () => {
              window.location.href = "/login";
            },
            onError: () => {},
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

const getHeaders = () => {
  return {};
  /**
   * get value
   */
  // const token = store.getState().app.token

  // try {
  //   if (token) {
  //     return { Authorization: "Token " + token }
  //   } else {
  //     return {}
  //   }
  // } catch {
  //   return {}
  // }
};

export async function get(url: string, config: object) {
  const response = await axiosApi.get(url, {
    ...config,
    headers: getHeaders(),
  });
  return response.data;
}

export async function post(url: string, data: object, config: object) {
  const headers = { ...getHeaders() };
  const response = await axiosApi.post(url, data, {
    ...config,
    headers,
  });
  return response.data;
}

export async function put(url: string, data: object, config: object) {
  const headers = { ...getHeaders() };
  const response = await axiosApi.put(url, data, {
    ...config,
    headers,
  });
  return response.data;
}

export async function remove(url: string, config: object) {
  const headers = { ...getHeaders() }; // Your custom header function
  const response = await axiosApi.delete(url, {
    ...config,
    headers,
  });
  return response.data;
}

export type FetchError = {
  success: false;
  error_message: string;
};

export type PostFetchResult<R> = { success: true; data: R } | FetchError;

export const postFetch = async <T, R>(
  url: string,
  params: T
): Promise<PostFetchResult<R>> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, data: result as R };
    } else {
      return {
        success: false,
        error_message: result.error_message || "An error occurred",
      };
    }
  } catch {
    return {
      success: false,
      error_message: "Network error or server is not reachable",
    };
  }
};

export const getFetch = async <R>(url: string): Promise<PostFetchResult<R>> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result as R };
    } else {
      return {
        success: false,
        error_message: "An error occurred",
      };
    }
  } catch {
    return {
      success: false,
      error_message: "Network error or server is not reachable",
    };
  }
};

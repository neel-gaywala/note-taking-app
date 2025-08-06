"use client";

import { useQueryClient } from "@tanstack/react-query";

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  // Function to invalidate all queries
  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  // Function to invalidate queries by a specific query key
  const invalidateQueries = (key: (string | object)[]) => {
    queryClient.invalidateQueries({ queryKey: key });
  };

  return {
    invalidateAllQueries,
    invalidateQueries,
  };
};

export { useInvalidateQueries };

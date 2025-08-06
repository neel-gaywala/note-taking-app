import { z } from "zod";

import { SERVER } from "@/services/urls";

export const getImageUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return SERVER + path;
};

export function paginationHandler(
  type: "next" | "prev" | "current",
  position: number
) {
  const page =
    type === "next" ? position + 1 : type === "prev" ? position - 1 : position;
  return page;
}

export function ifObjectExist(value: object) {
  let is_valid = true;
  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}

type ArrayItem<T> = {
  [K in keyof T]: T[K];
};

export function getObjectFromArrayByKey<T extends Record<string, unknown>>(
  array: ArrayItem<T>[],
  key: keyof T,
  value: T[keyof T]
): ArrayItem<T> | undefined {
  return array.find((item) => item[key] === value);
}

export function ifObjectKeyExist(
  object: Record<string, unknown>,
  key: string
): boolean {
  return object[key] !== undefined;
}

export function getArrayFromArrayOfObject<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T
) {
  const modifiedArr: (T[keyof T] | null | undefined)[] = [];
  if (data && data.length > 0) {
    data.forEach((el) => {
      modifiedArr.push(el[key]);
    });
  }
  return modifiedArr;
}

export function capitalizeFirstLetter(string: string) {
  if (string !== undefined && string !== null && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export function stringSlice(string: string, slice: number = 3) {
  return string.slice(0, slice);
}

export function isKeyValueExistInArray(
  array: Record<string, unknown>[],
  key: string,
  value: string
): boolean {
  return array.some((item) => item[key] === value);
}

export const stopPrevent = <T extends Event>(e: T): T => {
  (e as Event).stopPropagation();
  (e as Event).preventDefault();

  return e;
};

export const getInitials = (name: string) => {
  const parts = name.split(" ");
  const initials =
    parts.length > 1
      ? parts
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
      : name.slice(0, 2);

  return initials.toUpperCase();
};

export const displayZodErrors = (errors: z.ZodIssue[]) => {
  return errors
    .map((err) => {
      const field = err.path.join(".");
      const message = err.message;
      return `${field}: ${message}`;
    })
    .join(", ");
};

export const convertDropdownData = (tags: { id: string; name: string }[]) => {
  if (tags && tags.length > 0) {
    return tags.map(({ id, name }) => ({ id, value: name, label: name }));
  }
  return [];
};

export const convertObjectToArray = (obj: Record<string, unknown>) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};

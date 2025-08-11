export const STORAGE_NAME = "MyApp";
export const APP_NAME = "MyApp";
export const APP_VERSION = "1.0.0";
import { TSortFilter } from "./types";

export const NAVBAR_LIST = [
  { id: "1", name: "Notes", href: "/" },
  { id: "2", name: "Dashboard", href: "/dashboard" },
];

export const SORT_FILTER_DATA: TSortFilter = [
  { id: "1", item: "Newest", value: "newest" },
  { id: "2", item: "Oldest", value: "oldest" },
  { id: "3", item: "Title: A-Z", value: "asc" },
  { id: "4", item: "Title: Z-A", value: "desc" },
];

export const DATE_FILTER_DATA: TSortFilter = [
  { id: "1", item: "Today", value: "today" },
  { id: "2", item: "This Week", value: "week" },
  { id: "3", item: "This Month", value: "month" },
];

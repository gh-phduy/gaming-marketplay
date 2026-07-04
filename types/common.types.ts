/**
 * Common Types
 * Các type dùng chung trong toàn bộ ứng dụng
 */

/** Prop types cho components có children */
export interface WithChildren {
  children: React.ReactNode;
}

/** Prop types cho components có className */
export interface WithClassName {
  className?: string;
}

/** Kết hợp children và className */
export interface BaseComponentProps extends WithChildren, WithClassName {}

/** Response wrapper cho API */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/** Pagination info */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** Paginated response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

/** Sort options */
export interface SortOption {
  field: string;
  direction: "asc" | "desc";
  label: string;
}

/** Filter options */
export interface FilterOption {
  id: string;
  label: string;
  value: string | number | boolean;
  count?: number;
}

/** Size variants */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

/** Color variants */
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

/** Loading state */
export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

/** Generic callback type */
export type Callback<T = void> = (value: T) => void;

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
  badge?: string;
}

/** Image props */
export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: "blur-sm" | "empty";
  blurDataURL?: string;
}

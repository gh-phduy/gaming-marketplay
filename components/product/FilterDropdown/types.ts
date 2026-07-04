/**
 * FilterDropdown Types
 */

import { ReactNode } from "react";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  flagCode?: string;
  icon?: ReactNode;
}

export interface FilterDropdownProps {
  options: FilterOption[];
  defaultValue?: string;
  headerIcon: ReactNode;
  width?: string;
  onChange?: (id: string) => void;
  className?: string;
}

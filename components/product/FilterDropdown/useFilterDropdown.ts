"use client";

import { useState, useRef, useCallback, RefObject } from "react";
import {
  useDropdownAnimation,
  useArrowRotation,
  useClickOutside,
} from "@/lib/animations";
import { FilterOption } from "./types";

interface UseFilterDropdownReturn {
  value: string;
  isOpen: boolean;
  selectedOption: FilterOption;
  triggerRef: RefObject<HTMLButtonElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  arrowRef: RefObject<HTMLDivElement | null>;
  handleSelect: (optionId: string) => void;
  toggleDropdown: () => void;
}

export function useFilterDropdown(
  options: FilterOption[],
  defaultValue?: string,
  onChange?: (id: string) => void,
): UseFilterDropdownReturn {
  const [value, setValue] = useState(defaultValue || options[0]?.id);
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const contentRef = useDropdownAnimation(isOpen);
  const arrowRef = useArrowRotation(isOpen);

  // Close on outside click
  const handleClose = useCallback(() => setIsOpen(false), []);
  useClickOutside([triggerRef, dropdownRef], handleClose);

  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  const handleSelect = useCallback(
    (optionId: string) => {
      setValue(optionId);
      onChange?.(optionId);
      setIsOpen(false);
    },
    [onChange],
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    value,
    isOpen,
    selectedOption,
    triggerRef,
    dropdownRef,
    contentRef,
    arrowRef,
    handleSelect,
    toggleDropdown,
  };
}

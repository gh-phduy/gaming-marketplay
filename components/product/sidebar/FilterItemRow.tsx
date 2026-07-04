"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { FilterItem, FilterSubItem } from "./filter-data";
import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";

interface FilterItemProps {
  item: FilterItem;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  checkedIds: string[];
  onToggleCheck: (id: string, subItemIds?: string[]) => void;
}

export function FilterItemRow({
  item,
  isExpanded,
  onToggleExpand,
  checkedIds,
  onToggleCheck,
}: FilterItemProps) {
  const hasSubItems = item.subItems.length > 0;
  const subItemIds = item.subItems.map((s) => s.id);
  const isChecked = hasSubItems
    ? subItemIds.length > 0 &&
      subItemIds.every((subItemId) => checkedIds.includes(subItemId))
    : checkedIds.includes(item.id);

  // Sort sub-items: Checked ones go to top
  const sortedSubItems = useMemo(() => {
    return [...item.subItems].sort((a, b) => {
      const aChecked = checkedIds.includes(a.id);
      const bChecked = checkedIds.includes(b.id);
      if (aChecked && !bChecked) return -1;
      if (!aChecked && bChecked) return 1;
      return 0;
    });
  }, [item.subItems, checkedIds]);

  return (
    <motion.div layout className="flex flex-col">
      {/* Parent Item */}
      <div
        className={cn(
          "group flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-midnight-750/50",
          isExpanded && hasSubItems ? "bg-midnight-800" : "bg-transparent",
        )}
        onClick={() => hasSubItems && onToggleExpand(item.id)}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              id={item.id}
              checked={isChecked}
              onCheckedChange={() => onToggleCheck(item.id, subItemIds)}
              className="h-5 w-5 border-gray-500 data-[state=checked]:border-forest-500 data-[state=checked]:bg-forest-500"
            />
          </div>
          <label
            htmlFor={item.id}
            className="cursor-pointer text-base text-gray-200 group-hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {item.label}
          </label>
        </div>
        {hasSubItems && (
          <div className="text-gray-400">
            {isExpanded ? (
              <FaChevronUp size={12} />
            ) : (
              <FaChevronDown size={12} />
            )}
          </div>
        )}
      </div>

      {/* Sub Items Animation */}
      <AnimatePresence>
        {isExpanded && hasSubItems && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col">
              {sortedSubItems.map((subItem) => (
                <SubFilterItemRow
                  key={subItem.id}
                  subItem={subItem}
                  isChecked={checkedIds.includes(subItem.id)}
                  onToggle={() => onToggleCheck(subItem.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SubFilterItemRow({
  subItem,
  isChecked,
  onToggle,
}: {
  subItem: FilterSubItem;
  isChecked: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex cursor-pointer items-center justify-between rounded-sm py-2 pr-2 pl-2 transition-colors hover:bg-midnight-750"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
          <Checkbox
            id={subItem.id}
            checked={isChecked}
            onCheckedChange={onToggle}
            className="ml-1 h-4 w-4 border-gray-600 data-[state=checked]:border-forest-500 data-[state=checked]:bg-forest-500"
          />
        </div>
        <div className="flex items-center gap-2 text-gray-400 hover:text-white">
          {subItem.icon && (
            <span className="flex w-4 items-center justify-center text-lg">
              {subItem.icon}
            </span>
          )}
          <label
            htmlFor={subItem.id}
            className="cursor-pointer text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {subItem.label}
          </label>
        </div>
      </div>
      <span className="text-xs text-gray-600">{subItem.count}</span>
    </motion.div>
  );
}

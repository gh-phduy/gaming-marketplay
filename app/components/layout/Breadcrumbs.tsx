import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
  // Default breadcrumb structure if no items provided
  const defaultItems: BreadcrumbItem[] = [
    { label: "Console games", href: "/console-games" },
    { label: "Xbox live", href: "/xbox-live" },
    { label: "Xbox keys", href: "/xbox-keys" },
    { label: "Xbox series x", href: "/xbox-series-x" },
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav
      className="flex items-center gap-2 self-start overflow-x-auto text-xs text-gray-400 sm:text-sm"
      aria-label="Breadcrumb"
    >
      {/* Home Icon */}
      <Link
        href="/"
        className="transition-colors hover:text-gray-200"
        aria-label="Home"
      >
        <IoMdHome className="h-5 w-5" />
      </Link>

      {/* Breadcrumb Items */}
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* Separator */}
            <MdChevronRight className="h-4 w-4 text-gray-500" />

            {/* Breadcrumb Link or Text */}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="capitalize transition-colors hover:text-gray-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-300" : "capitalize"}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

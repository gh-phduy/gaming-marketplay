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
      className="flex w-full items-center gap-2 self-start overflow-x-auto whitespace-nowrap pb-1 text-xs text-gray-400 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:text-sm"
      aria-label="Breadcrumb"
    >
      {/* Home Icon */}
      <Link
        href="/"
        className="shrink-0 transition-colors hover:text-gray-200"
        aria-label="Home"
      >
        <IoMdHome className="h-5 w-5" />
      </Link>

      {/* Breadcrumb Items */}
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        return (
          <div key={index} className="flex shrink-0 items-center gap-2">
            {/* Separator */}
            <MdChevronRight className="h-4 w-4 text-gray-500 shrink-0" />

            {/* Breadcrumb Link or Text */}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="capitalize whitespace-nowrap transition-colors hover:text-gray-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-300 whitespace-nowrap" : "capitalize whitespace-nowrap"}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

"use client";

import { CategoryLandingClient } from "./CategoryLandingClient";
import {
  pageConfigs,
  type MarketplaceCategoryPageKey,
} from "./category-pages.config";

export function MarketplaceCategoryPageClient({
  pageKey,
}: {
  pageKey: MarketplaceCategoryPageKey;
}) {
  const pageConfig = pageConfigs[pageKey];

  return (
    <CategoryLandingClient
      title={pageConfig.title}
      description={pageConfig.description}
      categories={pageConfig.categories}
      searchInputId={`${pageKey}-category-search`}
      showMore={pageConfig.showMore}
      paginationPages={pageConfig.paginationPages}
      productTypeFilterId={pageKey}
    />
  );
}

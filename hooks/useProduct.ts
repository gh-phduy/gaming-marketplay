import { useQuery } from "@tanstack/react-query";
import { ProductApiResponse } from "@/types/api-product";

// Express backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Custom hook to fetch a single product by ID
 * Optimized for performance with caching
 */
export function useProduct(productId: string) {
  return useQuery<ProductApiResponse>({
    queryKey: ["product", productId],
    queryFn: async ({ signal }) => {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes - consider data fresh
    gcTime: 1000 * 60 * 10, // 10 minutes - keep in cache
    retry: 1, // Reduce retries for faster failure
    refetchOnWindowFocus: false, // Don't refetch on tab focus
    // placeholderData removed to allow Skeleton loading state
  });
}

/**
 * Custom hook to fetch all products
 * @returns Query result with products list, loading state, and error
 */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async ({ signal }) => {
      const response = await fetch(`${API_BASE_URL}/api/products`, { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}


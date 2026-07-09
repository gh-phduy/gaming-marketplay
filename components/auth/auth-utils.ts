/**
 * Parses error responses returned from the Supabase API into user-friendly error messages.
 * 
 * @param err The error object or string received from the API
 * @param fallback The default message to return if the error cannot be parsed
 * @returns A user-friendly error message string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseError = (err: any, fallback: string): string => {
  // 1. Check HTTP status code first (most reliable)
  const status = err?.status ?? err?.statusCode;
  if (status === 429) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (status === 422) {
    return "An account with this email already exists. Please log in instead.";
  }
  if (status === 400) {
    return "Invalid email or password format.";
  }

  // 2. Extract error message string from error object
  const raw = typeof err?.message === "string" ? err.message.trim() : "";
  if (raw.length > 0) {
    // Supabase sometimes encodes the error body as a JSON string e.g., "{}"
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const inner = parsed.message || parsed.msg || parsed.error_description;
        if (typeof inner === "string" && inner.trim().length > 0) {
          return inner;
        }
        return fallback;
      }
    } catch {
      // Not a JSON string - use the raw message as-is
    }

    // 3. Map common Supabase error phrases to friendlier text
    if (/already registered/i.test(raw)) {
      return "An account with this email already exists. Please log in instead.";
    }
    if (/rate limit/i.test(raw)) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    return raw;
  }

  // 4. Handle raw string errors
  if (typeof err === "string" && err.trim().length > 0) {
    return err;
  }

  // 5. Fallback default message
  return fallback;
};

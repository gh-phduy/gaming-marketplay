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
  // 2. Extract error message string from error object
  const raw = typeof err?.message === "string" ? err.message.trim() : "";
  if (raw.length > 0) {
    // Supabase sometimes encodes the error body as a JSON string e.g., "{}"
    let innerMsg = raw;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        innerMsg = parsed.message || parsed.msg || parsed.error_description || raw;
      }
    } catch {
      // Not a JSON string - use the raw message as-is
    }

    // 3. Map common Supabase error phrases to friendlier text
    if (/already registered/i.test(innerMsg) || /user already exists/i.test(innerMsg)) {
      return "An account with this email already exists. Please log in instead.";
    }
    if (/rate limit/i.test(innerMsg) || /too many requests/i.test(innerMsg)) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (/invalid login credentials/i.test(innerMsg)) {
      return "Invalid email or password. Please try again.";
    }
    if (/email not confirmed/i.test(innerMsg) || /verify your email/i.test(innerMsg)) {
      return "Please verify your email address before logging in.";
    }
    if (/user not found/i.test(innerMsg)) {
      return "No account found with this email address.";
    }
    if (/signups not allowed/i.test(innerMsg)) {
      return "Registration is currently disabled. Please try again later.";
    }
    if (/password/i.test(innerMsg) && /weak/i.test(innerMsg)) {
      return "Password is too weak. Please choose a stronger password.";
    }
    
    return innerMsg;
  }

  // 4. Handle raw string errors
  if (typeof err === "string" && err.trim().length > 0) {
    return err;
  }

  // 5. Fallback default message
  return fallback;
};

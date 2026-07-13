/**
 * Shared Submit button component used in login and signup forms.
 * Displays a loading state with a spinner animation while submitting form data.
 */
interface SubmitButtonProps {
  loading: boolean;
  label: string;
}

export default function SubmitButton({ loading, label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex h-[54px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#8a98ad] text-sm font-bold tracking-widest text-white transition-all duration-200 hover:bg-[#9aabbc] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {/* Spinner loading SVG */}
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Please wait...
        </span>
      ) : (
        label
      )}
    </button>
  );
}

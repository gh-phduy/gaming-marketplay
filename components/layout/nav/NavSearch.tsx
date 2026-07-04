interface NavSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function NavSearch({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
}: NavSearchProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative flex-1 cursor-pointer text-dm-text-secondary">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className="w-full cursor-text bg-surface-overlay px-4 py-2 text-dm-text-primary caret-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-state-focus"
        aria-label="Search products"
        placeholder=""
      />
      {!value && (
        <div
          className="pointer-events-none absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-x-1"
          aria-hidden="true"
        >
          Search by
          <span className="font-bold">Product</span>
        </div>
      )}
    </div>
  );
}

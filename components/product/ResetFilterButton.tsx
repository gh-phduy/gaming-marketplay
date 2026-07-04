import { IoMdClose } from "react-icons/io";

export default function ResetFilterButton() {
  return (
    <button className="group flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-lg border-none bg-surface-card transition-colors hover:bg-surface-overlay">
      <IoMdClose
        size={20}
        className="text-dm-text-tertiary transition-colors group-hover:text-dm-text-primary"
      />
    </button>
  );
}

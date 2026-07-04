import { MdKeyboardArrowDown } from "react-icons/md";

export default function ProductDescription() {
  return (
    <div className="flex w-full flex-col gap-y-2 rounded-lg bg-midnight-750 p-3 text-sm text-steel-500 sm:p-5 sm:text-base">
      <span>
        From Battlefield Studios, the titans who turned digital battlefields
        into sprawling sandboxes of destruction, comes the next generation of
        combined-arms combat. For years, they have been the undisputed kings of
        large-scale first-person shooters, and now they are channeling that
        legacy into their most ambitious project ever. Prepare for the front
        lines of Battlefield™ 6.
      </span>
      <div className="flex items-center gap-x-1 text-[#65c756]">
        <span>Read more</span>
        <MdKeyboardArrowDown size={28} />
      </div>
    </div>
  );
}

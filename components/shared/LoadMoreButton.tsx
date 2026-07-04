import { TbReload } from "react-icons/tb";

export default function LoadMoreButton() {
    return <div className="w-full h-[40px] bg-midnight-750 font-semibold uppercase text-sm flex items-center justify-center gap-2 cursor-pointer rounded-md" >
        <TbReload size={24} />
        <span>Show More</span>
    </div>;
}
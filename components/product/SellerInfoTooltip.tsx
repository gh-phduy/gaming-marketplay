import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";

interface SellerInfoTooltipProps {
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function SellerInfoTooltip({
  icon,
  content,
}: SellerInfoTooltipProps) {
  return (
    <Tooltip disableHoverableContent={true}>
      <TooltipTrigger asChild>
        <div className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-midnight-500 text-steel-500">
          {icon}
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        className="border-none bg-midnight-500 text-base text-white"
      >
        {content}
        <TooltipArrow className="fill-midnight-500" />
      </TooltipContent>
    </Tooltip>
  );
}

import ProductMediaSlider from "./ProductMediaSlider";
import ProductQuickStats from "./ProductQuickStats";

export default function ProductMediaOverview() {
  return (
    <div className="flex w-full justify-between gap-x-6">
      <ProductMediaSlider />
      <ProductQuickStats />
    </div>
  );
}

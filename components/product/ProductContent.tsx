import ProductDescriptionText from "./ProductDescriptionText";
import ProductKeyFeatures from "./ProductKeyFeatures";

export default function ProductContent() {
  return (
    <div className="mb-6 flex w-full flex-col gap-y-4 sm:mb-8 sm:gap-y-6">
      <h2 className="text-lg font-semibold text-white uppercase sm:text-xl md:text-[24px]">
        About product
      </h2>
      {/* <ProductDescriptionText /> */}
      <ProductKeyFeatures />
    </div>
  );
}

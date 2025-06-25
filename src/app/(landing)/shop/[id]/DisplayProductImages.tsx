import Image from "next/image";

export default function DisplayProductImages({
  product,
  selectedImage,
  setSelectedImage,
}: {
  product: {
    name: string;
    images: {
      thumbnails: string[];
    };
  };
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Image (shows selected thumbnail) */}
      <div className="bg-[#F5F5F5] rounded-md overflow-hidden w-full lg:w-[500px] h-[400px] lg:h-[600px] relative order-1 lg:order-2">
        <Image
          src={product.images.thumbnails[selectedImage]}
          alt={product.name}
          fill
          className="object-contain p-6"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-4 order-2 lg:order-1">
        {product.images.thumbnails.map((thumbnail, index) => (
          <button
            key={index}
            className={`bg-[#F5F5F5] rounded-md overflow-hidden w-[80px] h-[80px] lg:w-[138px] lg:h-[138px] relative ${
              selectedImage === index ? "ring-2 ring-[#DB4444]" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={thumbnail}
              alt={`${product.name} thumbnail ${index + 1}`}
              fill
              className="object-contain p-3"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, calculateDiscount, cn } from "@/lib/utils";
import { generateOrderLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const primaryImage = product.images?.[0]?.url;
  const secondaryImage = product.images?.[1]?.url;
  const discount =
    product.original_price
      ? calculateDiscount(product.original_price, product.price)
      : null;

  return (
    <div className={cn("group relative", className)}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-obsidian-700 aspect-[3/4]">
        {primaryImage ? (
          <>
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"
              )}
            />
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.title} - görsel 2`}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
              />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-obsidian-600 flex items-center justify-center">
            <span className="text-gold-500/30 font-display text-4xl">DS</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_featured && (
            <span className="badge-featured">Seçkin</span>
          )}
          {discount && (
            <span className="bg-red-900/80 text-red-200 text-xs font-sans font-medium px-2 py-0.5 tracking-wide">
              -%{discount}
            </span>
          )}
          {!product.is_available && (
            <span className="bg-obsidian-600/90 text-ivory-400 text-xs font-sans px-2 py-0.5 tracking-wide">
              Tükendi
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-obsidian-900/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-obsidian-900/80"
          aria-label="Beğen"
        >
          <Heart
            size={14}
            className={cn(
              "transition-colors",
              isWishlisted ? "text-red-400 fill-red-400" : "text-ivory-300"
            )}
          />
        </button>

        {/* Hover overlay with actions */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out z-10">
          <div className="flex">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-obsidian-900/90 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-ivory-200 hover:text-gold-400 hover:bg-obsidian-900 transition-all text-xs tracking-[0.12em] uppercase font-sans border-r border-gold-500/10"
            >
              <Eye size={13} />
              <span>İncele</span>
            </Link>
            {product.is_available && (
              <a
                href={generateOrderLink(product.sku, product.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gold-600/90 backdrop-blur-sm py-3 flex items-center justify-center gap-2 text-obsidian-900 hover:bg-gold-500 transition-all text-xs tracking-[0.12em] uppercase font-sans font-medium"
              >
                <MessageCircle size={13} />
                <span>Sipariş</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-sans text-xs tracking-wider text-gold-500/70 uppercase mb-1">
              {product.sku}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-body text-lg text-ivory-200 leading-snug hover:text-gold-400 transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
          </div>
          <div className="text-right shrink-0">
            <div className="font-sans text-base font-medium text-ivory-100">
              {formatPrice(product.price)}
            </div>
            {product.original_price && (
              <div className="font-sans text-xs text-ivory-500 line-through">
                {formatPrice(product.original_price)}
              </div>
            )}
          </div>
        </div>

        {/* Sizes preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {product.sizes.slice(0, 5).map((size) => (
              <span
                key={size}
                className="font-sans text-[10px] text-ivory-500 border border-obsidian-500 px-1.5 py-0.5 tracking-wider"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="font-sans text-[10px] text-ivory-500">+{product.sizes.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

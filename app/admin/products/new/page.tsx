"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
} from "lucide-react";
import { Button } from "@/components/Button";

interface UploadedImage {
  url: string;
  view: "front" | "back" | "lookbook";
}

export default function AdminNewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "cat_street_urban",
    price: "1499",
    collection: "Drop 01 / Street Urban",
    fit: "Oversized Boxy Fit",
    material: "100% Super Combed Cotton (240 GSM)",
    badge: "NEW",
    description: "",
  });

  const [images, setImages] = useState<{
    front: string;
    back: string;
    lookbook: string;
  }>({
    front: "",
    back: "",
    lookbook: "",
  });

  const [uploading, setUploading] = useState<{
    front: boolean;
    back: boolean;
    lookbook: boolean;
  }>({
    front: false,
    back: false,
    lookbook: false,
  });

  const [variants, setVariants] = useState([
    { size: "S", color: "Washed Black", sku: "", stock: 15 },
    { size: "M", color: "Washed Black", sku: "", stock: 25 },
    { size: "L", color: "Washed Black", sku: "", stock: 30 },
    { size: "XL", color: "Washed Black", sku: "", stock: 18 },
    { size: "XXL", color: "Washed Black", sku: "", stock: 8 },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const lookbookInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: generatedSlug,
    }));
  };

  const handleFileUpload = async (
    file: File,
    view: "front" | "back" | "lookbook"
  ) => {
    setUploading((prev) => ({ ...prev, [view]: true }));
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("slug", formData.slug || "custom-product");
      data.append("view", view);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setStatusMessage({
          type: "error",
          text: json.error || `Failed to upload ${view} image.`,
        });
        return;
      }

      setImages((prev) => ({
        ...prev,
        [view]: json.url,
      }));
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: `Error uploading ${view} image.`,
      });
    } finally {
      setUploading((prev) => ({ ...prev, [view]: false }));
    }
  };

  const handleVariantChange = (
    index: number,
    field: "size" | "color" | "sku" | "stock",
    val: string | number
  ) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const addVariantRow = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: "L",
        color: variants[0]?.color || "Washed Black",
        sku: `${(formData.slug || "TEE").toUpperCase()}-${Date.now().toString().slice(-4)}`,
        stock: 20,
      },
    ]);
  };

  const removeVariantRow = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    if (!formData.name || !formData.slug || !formData.price) {
      setStatusMessage({
        type: "error",
        text: "Please fill in all required fields (Name, Slug, Price).",
      });
      setIsSubmitting(false);
      return;
    }

    // Prepare image payload
    const finalImages = [];
    if (images.front) {
      finalImages.push({ url: images.front, altText: `${formData.name} Front View` });
    }
    if (images.back) {
      finalImages.push({ url: images.back, altText: `${formData.name} Back View` });
    }
    if (images.lookbook) {
      finalImages.push({ url: images.lookbook, altText: `${formData.name} Lookbook View` });
    }

    // Default fallback image if none uploaded
    if (finalImages.length === 0) {
      finalImages.push({
        url: "/images/products/street-01.jpg",
        altText: `${formData.name} Default`,
      });
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: finalImages,
          variants,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to create product.",
        });
        setIsSubmitting(false);
        return;
      }

      setStatusMessage({
        type: "success",
        text: `Product "${formData.name}" created and published to storefront! Redirecting...`,
      });

      setTimeout(() => {
        window.location.href = "/admin/products";
      }, 1500);
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Network error occurred while saving product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase text-white font-sans">
              ADD NEW STREETWEAR TEE
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Admin backend inventory creation terminal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">
              CANCEL
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="gap-1.5 bg-accent-volt text-black hover:bg-lime-400 font-mono font-bold"
          >
            <Save size={14} />
            <span>PUBLISH TO STORE</span>
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-lg text-xs font-mono flex items-center gap-2.5 ${
            statusMessage.type === "success"
              ? "bg-emerald-950/50 border border-emerald-500/50 text-emerald-300"
              : "bg-red-950/50 border border-red-500/50 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle size={16} className="shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Essential Info */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-volt uppercase pb-2 border-b border-zinc-800">
              <Layers size={14} />
              <span>1. PRODUCT IDENTITY &amp; PRICING</span>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                PRODUCT TITLE <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. TOKYO DRIFT OVERSIZED TEE"
                className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  URL SLUG <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="tokyo-drift-oversized-tee"
                  className="w-full bg-zinc-950 border border-zinc-700 text-zinc-300 px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  PRICE (INR ₹) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="1499"
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  PERSPECTIVE CATEGORY
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                >
                  <option value="cat_street_urban">Street / Urban</option>
                  <option value="cat_art_creative">Art / Creative</option>
                  <option value="cat_statement_attitude">Statement / Attitude</option>
                  <option value="cat_vintage_culture">Vintage / Culture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  PROMOTIONAL BADGE
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, badge: e.target.value }))
                  }
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2.5 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                >
                  <option value="NEW">NEW DROP</option>
                  <option value="BEST SELLER">BEST SELLER</option>
                  <option value="LIMITED">LIMITED EDITION</option>
                  <option value="OVERSIZED">OVERSIZED FIT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                EDITORIAL DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="240 GSM heavy combed cotton. High-density street calligraphy graphic on back with drop shoulder relaxed cut."
                className="w-full bg-zinc-950 border border-zinc-700 text-white p-3 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
              />
            </div>
          </div>

          {/* Card 2: Fabric & Fit Specifications */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="text-xs font-mono font-bold text-accent-volt uppercase pb-2 border-b border-zinc-800">
              2. FABRIC &amp; CONSTRUCTION SPECS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  SILHOUETTE FIT
                </label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fit: e.target.value }))
                  }
                  placeholder="Oversized Boxy Fit"
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  FABRIC COMPOSITION
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, material: e.target.value }))
                  }
                  placeholder="100% Cotton (240 GSM)"
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  COLLECTION
                </label>
                <input
                  type="text"
                  value={formData.collection}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, collection: e.target.value }))
                  }
                  placeholder="Drop 01 / Street Urban"
                  className="w-full bg-zinc-950 border border-zinc-700 text-white px-3 py-2 text-xs font-mono rounded focus:outline-none focus:border-accent-volt"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Variant Stock Matrix */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-accent-volt uppercase">
                3. SIZING VARIANTS &amp; STOCK
              </span>
              <button
                type="button"
                onClick={addVariantRow}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <Plus size={13} />
                <span>ADD VARIANT</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2.5 items-center bg-zinc-950 p-2.5 rounded border border-zinc-800"
                >
                  <div className="col-span-3">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                      SIZE
                    </label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) =>
                        handleVariantChange(index, "size", e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-2.5 py-1.5 text-xs font-mono rounded"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                      COLOR
                    </label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) =>
                        handleVariantChange(index, "color", e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-2.5 py-1.5 text-xs font-mono rounded"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                      STOCK COUNT
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", parseInt(e.target.value) || 0)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-2.5 py-1.5 text-xs font-mono rounded"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => removeVariantRow(index)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      title="Remove variant"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Image Uploader & Live Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Uploaders */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 space-y-4">
            <div className="text-xs font-mono font-bold text-accent-volt uppercase pb-2 border-b border-zinc-800">
              4. T-SHIRT IMAGES
            </div>

            {/* Front Image */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-300 font-semibold block">
                FRONT VIEW (PRIMARY)
              </label>
              <div
                onClick={() => frontInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file, "front");
                }}
                className="relative aspect-[4/5] rounded border border-dashed border-zinc-700 hover:border-accent-volt bg-zinc-950 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors group"
              >
                {images.front ? (
                  <Image
                    src={images.front}
                    alt="Front preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <UploadCloud
                      size={28}
                      className={`mx-auto text-zinc-500 group-hover:text-accent-volt mb-2 transition-colors ${
                        uploading.front ? "animate-pulse" : ""
                      }`}
                    />
                    <p className="text-[11px] font-mono text-zinc-300 uppercase">
                      {uploading.front ? "UPLOADING..." : "UPLOAD FRONT IMAGE"}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">
                      JPG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  ref={frontInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "front");
                  }}
                />
              </div>
            </div>

            {/* Back Image */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-300 font-semibold block">
                BACK VIEW (GRAPHIC)
              </label>
              <div
                onClick={() => backInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file, "back");
                }}
                className="relative aspect-[4/5] rounded border border-dashed border-zinc-700 hover:border-accent-volt bg-zinc-950 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors group"
              >
                {images.back ? (
                  <Image
                    src={images.back}
                    alt="Back preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <UploadCloud
                      size={28}
                      className={`mx-auto text-zinc-500 group-hover:text-accent-volt mb-2 transition-colors ${
                        uploading.back ? "animate-pulse" : ""
                      }`}
                    />
                    <p className="text-[11px] font-mono text-zinc-300 uppercase">
                      {uploading.back ? "UPLOADING..." : "UPLOAD BACK IMAGE"}
                    </p>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">
                      JPG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>
                )}
                <input
                  ref={backInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "back");
                  }}
                />
              </div>
            </div>

            {/* Lookbook / Poster (Optional) */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                LOOKBOOK / POSTER (OPTIONAL)
              </label>
              <div
                onClick={() => lookbookInputRef.current?.click()}
                className="relative h-24 rounded border border-dashed border-zinc-800 hover:border-zinc-600 bg-zinc-950 flex items-center justify-center cursor-pointer overflow-hidden transition-colors"
              >
                {images.lookbook ? (
                  <Image
                    src={images.lookbook}
                    alt="Lookbook preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">
                    + ADD CAMPAIGN POSTER
                  </p>
                )}
                <input
                  ref={lookbookInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "lookbook");
                  }}
                />
              </div>
            </div>
          </div>

          {/* Live Storefront Card Preview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-zinc-400 font-bold">
              <Eye size={13} />
              <span>STOREFRONT CARD PREVIEW</span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
              <div className="relative aspect-[3/4] bg-zinc-900">
                {images.front ? (
                  <Image
                    src={images.front}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-zinc-600">
                    AWAITING IMAGE
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-accent-volt text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                  {formData.badge}
                </span>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-zinc-500 uppercase">
                  {formData.collection}
                </p>
                <h4 className="text-xs font-bold font-mono text-white truncate uppercase mt-0.5">
                  {formData.name || "UNTITLED T-SHIRT"}
                </h4>
                <p className="text-xs font-mono text-zinc-300 font-bold mt-1">
                  ₹{formData.price || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

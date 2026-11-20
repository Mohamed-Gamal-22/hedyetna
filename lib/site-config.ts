export const siteConfig = {
  brandName: "هديتنا",
  logoPath: "/logo.svg",
  priceOriginal: 449,
  priceDiscounted: 349,
  currency: "جنيه",
  deliveryFee: 20,
  showDeliveryOnPage: true,
  deliveryAreas: ["القاهرة", "الجيزة", "6 أكتوبر", "الشيخ زايد"],
  countdown: {
    mode: "per-visitor" as "per-visitor" | "fixed",
    durationHours: 24,
    fixedEndDate: "2027-03-01T23:59:59+02:00",
    onExpire: "restore-original-price" as "restore-original-price" | "keep",
  },
  galleryImages: [
    { src: "/images/hero-open-box.svg", alt: "بوكس هديتنا مفتوح وداخله هدية الصلاة والسبحة والمبخرة" },
    { src: "/images/hero-gift-box.svg", alt: "بوكس هديتنا الأخضر بتغليف هدية ولمسة هلال" },
    { src: "/images/hero-arrangement.svg", alt: "تفاصيل سجادة الصلاة والسبحة والبخور في البوكس" },
  ],
};

export const products = [
  { name: "سجادة صلاة", description: "لسجدة ووقت هادي في يومك.", image: "/images/items/prayer-mat.svg" },
  { name: "سبحة", description: "للذكر والتسبيح في رمضان.", image: "/images/items/tasbih.svg" },
  { name: "مصلية", description: "قطعة أساسية ضمن هدية الصلاة.", image: "/images/items/prayer-dress.svg" },
  { name: "مبخرة", description: "لمسة رمضانية لطيفة للبيت.", image: "/images/items/incense-burner.svg" },
  { name: "بخور", description: "يكمل أجواء البوكس الرمضاني.", image: "/images/items/incense.svg" },
];

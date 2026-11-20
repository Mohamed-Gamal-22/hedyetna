"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, Check, Clock3, Gift, Heart, MapPin, Sparkles, Truck } from "lucide-react";
import { siteConfig, products } from "@/lib/site-config";
import { ProductGallery } from "@/components/product-gallery";
import { OrderForm } from "@/components/order-form";
import { RamadanScene } from "@/components/ramadan-scene";

const digitMap: Record<string, string> = { "0": "٠", "1": "١", "2": "٢", "3": "٣", "4": "٤", "5": "٥", "6": "٦", "7": "٧", "8": "٨", "9": "٩" };
const arabicDigits = (value: string) => value.replace(/[0-9]/g, (digit) => digitMap[digit]);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    let endAt = 0;
    if (siteConfig.countdown.mode === "fixed") {
      endAt = new Date(siteConfig.countdown.fixedEndDate).getTime();
    } else {
      const key = "hadeyetna-offer-start";
      const duration = siteConfig.countdown.durationHours * 60 * 60 * 1000;
      try {
        const stored = window.localStorage.getItem(key);
        const start = stored ? Number(stored) : Date.now();
        if (!stored) window.localStorage.setItem(key, String(start));
        endAt = start + duration;
      } catch {
        endAt = Date.now() + duration;
      }
    }
    const tick = () => setRemaining(Math.max(0, endAt - Date.now()));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const expired = mounted && remaining === 0 && siteConfig.countdown.onExpire === "restore-original-price";
  const shownPrice = expired ? siteConfig.priceOriginal : siteConfig.priceDiscounted;
  const clock = remaining === null ? null : {
    hours: Math.floor(remaining / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1000),
  };

  return (
    <main className="site-shell">
      <section className="hero-section">
        <RamadanScene />
        <header className="site-header page-container">
          <a className="brand-lockup" href="#top" aria-label="هديتنا، إلى بداية الصفحة">
            <Image src={siteConfig.logoPath} alt="" width={42} height={42} priority />
            <span>{siteConfig.brandName}</span>
          </a>
          <a href="#order" className="header-order">اطلب هديتك الآن <ArrowLeft size={15} /></a>
        </header>

        <div className="hero-content page-container" id="top">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" /> هدية فيها معنى</p>
            <h1>بوكس رمضان…<br /><span>هدية بتفرّح</span> <em>القلب</em></h1>
            <p className="hero-subtitle">سجادة وسبحة ومصلية ومبخرة وبخور… كل اللي محتاجاه لرمضان روحاني في بوكس واحد متغلّف بشياكة.</p>
            <div className="offer-note"><Sparkles size={17} /><span>{expired ? "انتهى عرض الخصم" : "خصم رمضان لفترة محدودة"}</span></div>
            <div className="price-row">
              {expired ? <p className="price-current"><strong>{arabicDigits(String(shownPrice))}</strong> <span>{siteConfig.currency}</span></p> : <>
                <p className="price-current"><strong>{arabicDigits(String(shownPrice))}</strong> <span>{siteConfig.currency}</span></p>
                <del className="price-old">{arabicDigits(String(siteConfig.priceOriginal))} {siteConfig.currency}</del>
              </>}
            </div>
            {!expired && <div className="countdown-wrap" aria-live="polite">
              <span className="countdown-label"><Clock3 size={15} /> العرض ينتهي بعد</span>
              {clock ? <div className="countdown" dir="ltr"><span><b>{String(clock.hours).padStart(2, "0")}</b><small>ساعة</small></span><i>:</i><span><b>{String(clock.minutes).padStart(2, "0")}</b><small>دقيقة</small></span><i>:</i><span><b>{String(clock.seconds).padStart(2, "0")}</b><small>ثانية</small></span></div> : <div className="countdown-skeleton" />}
            </div>}
            <a className="button button-primary hero-cta" href="#order">اطلب دلوقتي والدفع عند الاستلام <ArrowDown size={18} /></a>
            {siteConfig.showDeliveryOnPage && <p className="hero-delivery">التوصيل {arabicDigits(String(siteConfig.deliveryFee))} جنيه <span>•</span> الإجمالي {arabicDigits(String(shownPrice + siteConfig.deliveryFee))} جنيه</p>}
          </div>
          <div className="hero-visual"><span className="visual-halo" /><span className="visual-stamp"><Gift size={17} /> لمّة رمضان</span><ProductGallery /><span className="floating-note"><Heart size={15} fill="currentColor" /> من هديتنا ليكي</span></div>
        </div>
        <div className="hero-bottom page-container"><span>هدية تجمع اللي بتحبيه</span><span className="hero-bottom-line" /><span>وتتقدّم بحب</span></div>
      </section>

      <section className="inside-section page-container" aria-labelledby="inside-title">
        <div className="section-heading"><p className="eyebrow">تفاصيل متختارة بحب</p><h2 id="inside-title">إيه جوّه <span>البوكس؟</span></h2><p>خمس قطع لرمضان أهدى وأجمل، متجمّعين في هدية واحدة.</p></div>
        <div className="inside-grid">{products.map((product, index) => <article className="inside-item" key={product.name}><span className="item-number">{arabicDigits(String(index + 1).padStart(2, "0"))}</span><span className="item-icon"><Image src={product.image} alt="" width={46} height={46} /></span><div><h3>{product.name}</h3><p>{product.description}</p></div></article>)}</div>
      </section>

      <section className="trust-section"><div className="page-container trust-row"><div className="trust-chip"><span><Check size={17} /></span><p>الدفع عند الاستلام</p></div><div className="trust-chip"><span><MapPin size={17} /></span><p>التوصيل لـ {siteConfig.deliveryAreas.join("، ")}</p></div><div className="trust-chip"><span><Gift size={17} /></span><p>تغليف هدايا فاخر</p></div></div></section>

      <section className="order-section page-container">
        <div className="order-intro"><p className="eyebrow">مستنية إيه؟</p><h2>خلي رمضان<br /><span>يفتكر بالحب.</span></h2><p>اكتبي بياناتك، وفريق هديتنا هيتواصل معاكي لتأكيد الطلب.</p><div className="order-perks"><p><Truck size={17} /> توصيل لحد باب البيت</p><p><Heart size={17} /> هدية متحضّرة بحب</p></div></div>
        <OrderForm offerActive={!expired} priceShown={shownPrice} />
      </section>

      <footer className="site-footer page-container"><a className="brand-lockup" href="#top"><Image src={siteConfig.logoPath} alt="" width={35} height={35} /><span>{siteConfig.brandName}</span></a><p>تفاصيل صغيرة، وفرحة كبيرة.</p><span className="footer-note">بياناتك بنستخدمها لتأكيد طلبك وتوصيله فقط.</span></footer>
      <a className="sticky-cta" href="#order">اطلب هديتك الآن <ArrowLeft size={18} /></a>
    </main>
  );
}

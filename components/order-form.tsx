"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { normalizeDigits } from "@/lib/validation";

type FormValues = { name: string; address: string; phone: string; phone2: string };
const empty: FormValues = { name: "", address: "", phone: "", phone2: "" };

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (values.name.trim().length < 3) errors.name = "اكتبي الاسم ثلاث حروف على الأقل.";
  if (values.address.trim().length < 10) errors.address = "اكتبي العنوان بالتفصيل، 10 حروف على الأقل.";
  const mobile = /^01[0125][0-9]{8}$/;
  if (!mobile.test(normalizeDigits(values.phone))) errors.phone = "رقم الموبايل لازم يكون 11 رقم مصري.";
  if (values.phone2 && !mobile.test(normalizeDigits(values.phone2))) errors.phone2 = "رقم الموبايل الإضافي مش صحيح.";
  return errors;
}

export function OrderForm({ offerActive, priceShown }: { offerActive: boolean; priceShown: number }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "handoff">("idle");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const lines = [
      "طلب جديد من هديتنا",
      `الاسم: ${values.name.trim()}`,
      `العنوان: ${values.address.trim()}`,
      `رقم الموبايل: ${normalizeDigits(values.phone)}`,
      `رقم موبايل آخر: ${values.phone2 ? normalizeDigits(values.phone2) : "غير مضاف"}`,
      `السعر: ${priceShown} ${siteConfig.currency}`,
      `التوصيل: ${siteConfig.deliveryFee} ${siteConfig.currency}`,
      `الإجمالي: ${priceShown + siteConfig.deliveryFee} ${siteConfig.currency}`,
    ];
    const url = `https://wa.me/201148948425?text=${encodeURIComponent(lines.join("\n"))}`;
    setWhatsAppUrl(url);
    setStatus("handoff");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="order" className="order-card" aria-labelledby="order-title">
      {status === "handoff" ? <div className="success-state"><span className="success-icon"><Check size={30} /></span><p className="eyebrow">بياناتك جاهزة</p><h2 id="order-title">كمّلي طلبك على واتساب</h2><p>فتحنا رسالة فيها بيانات الطلب. اضغطي «إرسال» في واتساب عشان توصلك.</p><a className="button button-primary submit-button" href={whatsAppUrl} target="_blank" rel="noreferrer">افتح واتساب وأرسل الطلب <ArrowLeft size={18} /></a><button type="button" className="edit-order-button" onClick={() => setStatus("idle")}>مراجعة البيانات</button></div> : <>
        <div className="order-heading"><span className="order-icon"><ShieldCheck size={22} /></span><div><p className="eyebrow">خطوة أخيرة</p><h2 id="order-title">املا بياناتك وإحنا هنكلمك نأكد الطلب</h2></div></div>
        <form onSubmit={submit} noValidate>
          <div className="field"><label htmlFor="name">الاسم <span>*</span></label><input id="name" name="name" autoComplete="name" required value={values.name} onFocus={() => startCheckout()} onChange={(event) => update("name", event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="اكتبي اسمك" />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</div>
          <div className="field"><label htmlFor="address">العنوان بالتفصيل <span>*</span></label><textarea id="address" name="address" autoComplete="street-address" required rows={3} value={values.address} onFocus={() => startCheckout()} onChange={(event) => update("address", event.target.value)} aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} placeholder="المحافظة، المنطقة، الشارع، رقم البيت" />{errors.address && <small id="address-error" className="field-error">{errors.address}</small>}</div>
          <div className="field"><label htmlFor="phone">رقم الموبايل <span>*</span></label><input id="phone" name="tel" type="tel" inputMode="numeric" autoComplete="tel-national" required value={values.phone} onFocus={() => startCheckout()} onChange={(event) => update("phone", event.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="01xxxxxxxxx" dir="ltr" />{errors.phone && <small id="phone-error" className="field-error">{errors.phone}</small>}</div>
          <div className="field"><label htmlFor="phone2">رقم موبايل آخر <span className="optional">اختياري</span></label><input id="phone2" name="tel-national" type="tel" inputMode="numeric" autoComplete="tel-national" value={values.phone2} onFocus={() => startCheckout()} onChange={(event) => update("phone2", event.target.value)} aria-invalid={!!errors.phone2} aria-describedby={errors.phone2 ? "phone2-error" : undefined} placeholder="01xxxxxxxxx" dir="ltr" />{errors.phone2 && <small id="phone2-error" className="field-error">{errors.phone2}</small>}</div>
          <button type="submit" className="button button-primary submit-button">متابعة على واتساب <ArrowLeft size={18} /></button>
          {siteConfig.showDeliveryOnPage && <p className="delivery-total">التوصيل {siteConfig.deliveryFee} جنيه <span>•</span> الإجمالي {priceShown + siteConfig.deliveryFee} جنيه</p>}
          <p className="privacy-note">بياناتك بنستخدمها لتأكيد الطلب وتوصيله بس.</p>
        </form>
      </>}
    </section>
  );
}

function startCheckout() {
  const windowWithPixel = window as Window & { fbq?: (...args: unknown[]) => void; checkoutStarted?: boolean };
  if (!windowWithPixel.checkoutStarted && windowWithPixel.fbq) {
    windowWithPixel.checkoutStarted = true;
    windowWithPixel.fbq("track", "InitiateCheckout");
  }
}

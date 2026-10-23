import React from 'react'
import { Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react'

export function Footer({ lang = 'en', t }) {
  return (
    <footer className="border-t border-[#231e1a] bg-[#090807] text-[#9c9183] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfc086] via-[#ceab68] to-[#9e7a3d] flex items-center justify-center font-serif font-black text-[#0e0d0c] text-base shadow-sm">
              W
            </div>
            <span className="font-serif text-xl font-bold text-[#f7f3eb]">{t.brandName}</span>
          </div>
          <p className="text-xs text-[#9c9183] leading-relaxed">
            {lang === 'ar'
              ? 'دليل قاعات وأفراح القاهرة المعتمد. منصة مستقلة توفر معلومات حقيقية وأسعار شفافة وسعات موثقة للعروسين في مصر.'
              : 'Cairo’s curated wedding venue registry. Direct verified capacities, transparent package rates, and authentic spaces without misleading placeholders.'}
          </p>
          <div className="text-[11px] text-[#dfc086] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Weddo MVP v0.7 — Local Cairo Preview</span>
          </div>
        </div>

        {/* Areas */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d6cebf]">
            {lang === 'ar' ? 'مناطق القاهرة' : 'Cairo Destinations'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#venues-catalog" className="hover:text-[#dfc086] transition-colors">
                {lang === 'ar' ? 'القاهرة الجديدة والتجمع' : 'New Cairo & Tagamoa'}
              </a>
            </li>
            <li>
              <a href="#venues-catalog" className="hover:text-[#dfc086] transition-colors">
                {lang === 'ar' ? 'جاردن سيتي وكورنيش النيل' : 'Garden City & Nile Corniche'}
              </a>
            </li>
            <li>
              <a href="#venues-catalog" className="hover:text-[#dfc086] transition-colors">
                {lang === 'ar' ? 'مصر الجديدة والكوربة' : 'Heliopolis & Korba'}
              </a>
            </li>
            <li>
              <a href="#venues-catalog" className="hover:text-[#dfc086] transition-colors">
                {lang === 'ar' ? 'الجيزة وإطلالة الأهرامات' : 'Giza & Pyramids Plateau'}
              </a>
            </li>
            <li>
              <a href="#venues-catalog" className="hover:text-[#dfc086] transition-colors">
                {lang === 'ar' ? 'جزيرة الزمالك' : 'Zamalek Island'}
              </a>
            </li>
          </ul>
        </div>

        {/* Trust & Guarantee */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#fdfbf7]">
            {lang === 'ar' ? 'معايير ويدو' : 'Weddo Standards'}
          </h4>
          <ul className="space-y-2 text-xs text-[#a89d91]">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>{lang === 'ar' ? 'سعات استيعابية مدققة رسمياً' : 'Certified space capacities'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>{lang === 'ar' ? 'تثبيت أسعار الباقات بالاستفسار' : 'Inquiry rate snapshotting'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>{lang === 'ar' ? 'محادثات خاصة ومشفرة مع المنسق' : 'Private coordinator messaging'}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dfc086] shrink-0" />
              <span>{lang === 'ar' ? 'حظر المواعيد غير المتاحة' : 'Date collision prevention'}</span>
            </li>
          </ul>
        </div>

        {/* Local Preview Notice */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#fdfbf7]">
            {lang === 'ar' ? 'إشعار المعاينة' : 'Preview Notice'}
          </h4>
          <p className="text-xs text-[#786e64] leading-relaxed">
            {lang === 'ar'
              ? 'هذه نسخة معاينة محلية لتقييم تجربة الاستخدام، ولا تتضمن دفعات نقدية فعلية أو تأكيد حجز نهائي. لا تمثل طلبيات الاستفسار حجوزات مؤكدة.'
              : 'This local preview evaluates the wedding venue customer and vendor experience. An inquiry or offer never reserves a date or processes external transactions.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#27221e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786e64]">
        <div>
          © 2026 {t.brandName}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
        </div>
        <div className="flex items-center gap-1 text-[#a89d91]">
          <span>{lang === 'ar' ? 'صُمم خصيصاً لأفراح القاهرة الكبرى' : 'Crafted with care for Cairo weddings'}</span>
          <Heart className="w-3.5 h-3.5 text-[#dfc086] fill-[#dfc086] inline" />
        </div>
      </div>
    </footer>
  )
}
export default Footer

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, Check, ArrowRight, Crown, HelpCircle } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { sound } from '@/lib/sound'

export function PricingSection({ lang, t }) {
  const [billingCycle, setBillingCycle] = useState('annual') // 'monthly' | 'annual'

  const plans = [
    {
      id: 'free',
      name: t.planFreeTitle,
      monthlyPrice: '0 EGP',
      annualPrice: '0 EGP',
      frequency: lang === 'ar' ? 'مجاناً للأبد' : 'Forever Free',
      description: t.planFreeDesc,
      features: [
        lang === 'ar' ? 'تصفح كافة قاعات القاهرة ومصر' : 'Browse all Cairo & Egypt venues',
        lang === 'ar' ? 'حفظ القاعات في قائمتك المفضلة' : 'Save shortlist to device & account',
        lang === 'ar' ? 'مقارنة حتى ٣ قاعات جنباً إلى جنب' : 'Compare up to 3 venues side-by-side',
        lang === 'ar' ? 'إرسال طلبات حجز واستفسارات مباشرة' : 'Direct structured inquiries to venues',
      ],
      isPopular: false,
      btnText: t.planBtnFree,
      btnStyle: 'bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#34332e] border border-[#dfdcd5] dark:border-[#2e2d28]',
    },
    {
      id: 'monthly',
      name: t.planMonthlyTitle,
      monthlyPrice: '1,450 EGP',
      annualPrice: '890 EGP',
      frequency: billingCycle === 'annual' ? (lang === 'ar' ? 'شهرياً • اشتراك سنوي' : 'per month • annual pass') : (lang === 'ar' ? 'يُجدد شهرياً • إلغاء بأي وقت' : 'Billed Monthly • Cancel anytime'),
      description: t.planMonthlyDesc,
      features: [
        lang === 'ar' ? 'فتح كامل لمخطط توزيع مقاعد الضيوف' : 'Full visual seating chart & floor planner',
        lang === 'ar' ? 'لوحة إلهام تفاعلية وتعليقات مباشرة' : 'Interactive Dream Board & team notes',
        lang === 'ar' ? 'حاسبة الميزانية ومتابعة بنود الصرف' : 'Smart EGP budget allocation engine',
        lang === 'ar' ? 'متابعة فواتير وعقود الموردين' : 'Vendor contracts & invoice ticket tracker',
      ],
      isPopular: false,
      btnText: t.planBtnUpgrade,
      btnStyle: 'bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] hover:opacity-85',
    },
    {
      id: 'annual',
      name: t.planAnnualTitle,
      monthlyPrice: '2,900 EGP',
      annualPrice: '1,750 EGP',
      frequency: billingCycle === 'annual' ? (lang === 'ar' ? 'شهرياً • وفر ٤٧٪' : 'per month • Save 47%') : (lang === 'ar' ? 'اشتراك شهري شامل' : 'Monthly all-inclusive'),
      description: t.planAnnualDesc,
      features: [
        lang === 'ar' ? 'كافة مزايا الاشتراك الشهري المتقدمة' : 'All Monthly & Pro features included',
        lang === 'ar' ? 'وصول لـ ١٢ شهراً حتى موعد الزفاف' : '12 months continuous access until wedding',
        lang === 'ar' ? 'تنسيق مع كبار منسقي الأفراح في مصر' : 'Curated Egyptian wedding planner directory',
        lang === 'ar' ? 'دعم محلي ذو أولوية عبر الواتساب' : 'Priority local VIP WhatsApp support',
      ],
      isPopular: true,
      btnText: t.planBtnUpgrade,
      btnStyle: 'bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] hover:opacity-85 font-medium',
    }
  ]

  const faqs = [
    {
      q: lang === 'ar' ? 'كيف تعمل خدمة تثبيت موعد الزفاف وحجز القاعة؟' : 'How does the wedding date hold and lock system work?',
      a: lang === 'ar' 
        ? 'بمجرد إرسال طلبك عبر WEDDO، يتم حجز موعدك بشكل مبدئي لمدة ٧٢ ساعة مع منسق القاعة الرئيسي، ويتم إرسال دعوة تذوق رسمي وعقد الحجز الموثق مباشرة دون أي رسوم وساطة خفية.'
        : 'Once you submit a structured inquiry, your desired date is held tentatively for 72 hours with the executive venue coordinator. You receive an official menu tasting invitation and legal venue prospectus with zero hidden fees.'
    },
    {
      q: lang === 'ar' ? 'هل جلسة تذوق قائمة الطعام (Tasting Session) مشمولة مجاناً؟' : 'Are food tasting sessions complimentary for couples?',
      a: lang === 'ar'
        ? 'نعم، كافة الباقات المعتمدة على WEDDO تقدم جلسة تذوق مجانية لـ ٤ أفراد مع الشيف التنفيذي بمجرد تأكيد الفحص الأولي، لضمان أعلى معايير الضيافة الملكية.'
        : 'Yes, all certified venue packages on WEDDO include a private 4-person tasting session with the Executive Chef upon initial reservation to ensure your banquet is exceptional.'
    },
    {
      q: lang === 'ar' ? 'هل يُسمح بالاستعانة بمصممي ديكور ومصوري أفراح من خارج القاعة؟' : 'Can couples bring outside wedding planners, florists, and photographers?',
      a: lang === 'ar'
        ? 'جميع القاعات المسجلة في WEDDO تلتزم بمبدأ الشفافية وتتيح جلب مورديكم المفضلين (مكياج، تصوير، كوشة وديكور) مع تنسيق تصاريح الدخول الرسمية بدون رسوم تعسفية.'
        : 'All partner estates adhere to open-vendor policies. Couples may bring their preferred decorators, photographers, and entertainment teams with standard venue security clearance.'
    },
    {
      q: lang === 'ar' ? 'ما هي سياسة الإلغاء أو تعديل موعد الفرح في حالات الطوارئ؟' : 'What is the postponement and rescheduling policy in Egypt?',
      a: lang === 'ar'
        ? 'نوفر سياسة مرونة كاملة تسمح بنقل موعد الفرح لأي تاريخ متاح خلال ٦ أشهر بدون أي غرامات إدارية، مع ضمان تثبيت أسعار الباقة المتفق عليها.'
        : 'Partner venues offer guaranteed date transfer flexibility up to 6 months in advance with zero penalty fees, locking in your contract pricing against inflation.'
    }
  ]

  return (
    <section id="pricing-plans" className="py-12 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[28.8px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] text-[#595855] dark:text-[#a8a69e] text-[11px] font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3 h-3 text-[#000000] dark:text-[#f5f5f3]" />
          <span>FOLIA PLANNING MEMBERSHIP // 2026</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-[#000000] dark:text-[#f5f5f3] leading-[1.1] mb-4">
          {t.pricingTitle}
        </h2>

        <p className="text-[14px] sm:text-[15px] text-[#595855] dark:text-[#a8a69e] leading-relaxed font-sans mb-8">
          {t.pricingSubtitle}
        </p>

        {/* Interactive Billing Toggle */}
        <div className="inline-flex max-w-full items-center bg-[#dfdcd5]/60 dark:bg-[#282723] p-1 sm:p-1.5 rounded-full border border-[#dfdcd5] dark:border-[#2e2d28]">
          <button
            onClick={() => {
              sound.tap()
              setBillingCycle('monthly')
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all select-none cursor-pointer ${
              billingCycle === 'monthly' ? 'bg-[#000000] text-[#ffffff] dark:bg-[#f5f5f3] dark:text-[#0b0b0a] shadow-xs' : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            {lang === 'ar' ? 'اشتراك شهري' : 'Monthly'}
          </button>
          <button
            onClick={() => {
              sound.tap()
              setBillingCycle('annual')
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all select-none cursor-pointer ${
              billingCycle === 'annual' ? 'bg-[#000000] text-[#ffffff] dark:bg-[#f5f5f3] dark:text-[#0b0b0a] shadow-xs' : 'text-[#595855] dark:text-[#a8a69e] hover:text-[#000000] dark:hover:text-[#f5f5f3]'
            }`}
          >
            <span>{lang === 'ar' ? 'اشتراك سنوي' : 'Annual Pass'}</span>
            <Badge variant="live" className="text-[10px] py-0 px-1.5 sm:px-2 bg-emerald-500 text-white border-none">
              {lang === 'ar' ? 'وفر ٤٧٪' : 'Save 47%'}
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-20">
        {plans.map(plan => {
          const displayPrice = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`rounded-[14px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-[#e7e5e4] dark:bg-[#1c1b18] border-2 border-[#000000] dark:border-[#f5f5f3] shadow-md'
                  : 'bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28]'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span className="px-3.5 py-0.5 rounded-[28.8px] bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                    <Crown className="w-3 h-3 text-[#dfdcd5] dark:text-[#34332e]" />
                    <span>{lang === 'ar' ? 'الأكثر طلباً للعروسين' : 'Most Popular Portfolio'}</span>
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-serif text-2xl font-normal text-[#000000] dark:text-[#f5f5f3] mb-2">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-[#000000] dark:text-[#f5f5f3] tracking-tight">
                    {displayPrice}
                  </span>
                </div>

                <span className="text-[12px] text-[#595855] dark:text-[#a8a69e] font-mono tracking-wider block mb-4 uppercase">
                  {plan.frequency}
                </span>

                <p className="text-[14px] text-[#595855] dark:text-[#a8a69e] leading-relaxed mb-6 pb-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] font-sans">
                  {plan.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#000000] dark:text-[#f5f5f3] font-sans">
                      <div className="w-4 h-4 rounded-full bg-[#000000] dark:bg-[#f5f5f3] text-[#ffffff] dark:text-[#0b0b0a] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  sound.success()
                  alert(lang === 'ar' ? 'تم اختيار الباقة! جاري تجهيز مساحتك.' : 'Plan selected! Setting up your workspace.')
                }}
                className={`tap-bounce w-full py-3 min-h-[44px] rounded-[28.8px] text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${plan.btnStyle}`}
              >
                <span>{plan.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </motion.button>

            </motion.div>
          )
        })}
      </div>

      {/* shadcn Accordion: Venue Membership & Booking Policies FAQ */}
      <div className="max-w-3xl mx-auto rounded-[14px] bg-[#e7e5e4] dark:bg-[#1c1b18] p-6 sm:p-10 border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-4 h-4 text-[#000000] dark:text-[#f5f5f3]" />
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#000000] dark:text-[#f5f5f3]">
            {lang === 'ar' ? 'الأسئلة الشائعة وضمانات الحجز' : 'Frequently Asked Questions & Booking Guarantee'}
          </h3>
        </div>

        <Accordion type="single" collapsible defaultValue="item-0">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-[#dfdcd5] dark:border-[#2e2d28]">
              <AccordionTrigger className="text-start rtl:text-right text-[#000000] dark:text-[#f5f5f3] text-sm sm:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#595855] dark:text-[#a8a69e] text-xs sm:text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </section>
  )
}

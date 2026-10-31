# WEDDO — Sovereign Design Identity & Component Specification
> Renaissance Gallery on Putty Paper • Egyptian Luxury Venues & Architectural Architecture

---

## 1. Brand Identity & Aesthetic Philosophy

**WEDDO** reframes Egyptian luxury venue curation, historic royal ballrooms, Nile salons, and executive convention summits as an archival fine-art gallery exhibition. 

### Core Design Principles
1. **Gallery Exhibition Canvas**: Surfaces reject generic corporate white or stark black-and-blue SaaS tropes. The default daylight surface is a tactile, warm putty-limestone paper (`#c4c3b6`), paired with warm bone exhibition cards (`#e7e5e4`) and hairline vellum borders (`#dfdcd5`). At night, the system shifts into a museum "dark room" (`#121210` canvas, `#1c1b18` cards).
2. **Typographic Hierarchy as Protagonist**:
   - **English**: Classical high-contrast serif (`Davinci` / `Playfair Display`) carries emotional authority, paired with architectural grotesk (`Helvetica Now` / `Inter`) for utility, stats, and metadata.
   - **Arabic (Bulaq 1820 Revival)**: Archival Egyptian Naskh (`Amiri`) handles editorial and display headlines with zero negative tracking, while `Almarai` provides humanist architectural clarity for UI buttons, forms, and data.
3. **Restraint & Flat Surfaces**: No noisy multi-color gradients, neon glow halos, or heavy drop shadows. Elevation is achieved through tone shifts (Putty Level 0 → Bone Level 1), crisp 1px hairline borders (`#dfdcd5` / `#2e2d28`), and deliberate interactive depth (GSAP 3D mouse parallax tilt, Anime.js micro-bounces, and WebGL curved cards).
4. **Multi-Sensory Audio-Haptic Feedback**: Every primary interaction (tabs, sliders, compare toggles, modal triggers, bookmarks) is accompanied by physical Web Audio API micro-feedback synthesized in real-time.
5. **Fluid Responsive & Container-Aware**: Components utilize modern `@container` queries, ensuring layouts adapt to their localized card width rather than relying solely on global viewport breakpoints.

---

## 2. Design Tokens Reference

### 2.1 Color Palette

```
  Light Canvas (Putty)        Card Surface (Bone)         Hairline Divider (Vellum)
        #c4c3b6                     #e7e5e4                     #dfdcd5
  ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
  │                 │         │                 │         │                 │
  └─────────────────┘         └─────────────────┘         └─────────────────┘

  Dark Canvas (Ink Room)      Dark Card Surface           Dark Hairline Divider
        #121210                     #1c1b18                     #2e2d28
  ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
  │                 │         │                 │         │                 │
  └─────────────────┘         └─────────────────┘         └─────────────────┘
```

| Token Name | Light Value | Dark Value | CSS / Tailwind Var | Semantic Role |
|------------|-------------|------------|---------------------|---------------|
| **Putty** | `#c4c3b6` | `#121210` | `--color-putty` / `bg-[#c4c3b6]` | Primary page canvas; sets the gallery tone across all pages. |
| **Bone** | `#e7e5e4` | `#1c1b18` | `--color-bone` / `bg-[#e7e5e4]` | Elevated card surfaces, search cockpits, drawers, modals. |
| **Vellum** | `#dfdcd5` | `#2e2d28` | `--color-vellum` / `border-[#dfdcd5]` | 1px hairline borders, card frames, separators. |
| **Ink** | `#000000` | `#f5f5f3` | `--color-ink` / `text-[#000000]` | Primary text, primary CTA pill button fill, brand monogram. |
| **Graphite** | `#595855` | `#a8a69e` | `--color-graphite` / `text-[#595855]` | Secondary metadata, captions, subtitles, currency labels. |
| **Chalk** | `#ebebeb` | `#181715` | `--color-chalk` / `bg-[#ebebeb]` | Tertiary surface tier, subtle input wells. |
| **Ash** | `#808080` | `#636159` | `--color-ash` | Image skeleton placeholders, neutral indicator dots. |
| **Paper** | `#ffffff` | `#0b0b0a` | `--color-paper` | Contrast badge text, inverted pill button fills. |

#### Luxury Egyptian Accent Tokens
| Accent Token | Hex | Role |
|--------------|-----|------|
| **Emerald Deep** | `#0b2e26` / `#10b981` | Civil defense verified status, confirmed bookings, live holds. |
| **Imperial Gold** | `#997541` / `#fbbf24` | Certified partner stars, VIP Kosha stage, royal memberships. |
| **Coral Rose** | `#f472b6` / `#e11d48` | Shortlist heart state, pricing pass highlights. |
| **Sky Azure** | `#38bdf8` / `#0284c7` | Nile waterfront tags, 360° virtual tour triggers. |
| **Royal Iris** | `#8b5cf6` / `#4c1d95` | Venue operations hub, decibel acoustic badges. |

---

### 2.2 Typography System

```
  ENGLISH EDITORIAL                           ARABIC ARCHIVAL
  Serif: Playfair Display / Davinci           Serif: Amiri (Bulaq 1820 Revival)
  Sans:  Inter / Helvetica Now                Sans:  Almarai Humanist Sans
  Mono:  SF Mono / JetBrains Mono             Mono:  Almarai (Tabular Figures)
```

```css
/* Font Family Definitions */
--font-davinci: 'Playfair Display', 'Amiri', Georgia, serif;
--font-helvetica-now: 'Inter', 'Almarai', -apple-system, sans-serif;
--font-arabic-display: 'Amiri', 'Noto Serif Arabic', Georgia, serif;
--font-arabic-sans: 'Almarai', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
```

#### Type Scale & Application
| Role | Size | Line Height | Tracking (LTR) | Tracking (RTL Arabic) | Font Family |
|------|------|-------------|----------------|-----------------------|-------------|
| **Display Monument** | `48px`–`72px` | `0.95`–`1.05` | `-0.03em` | `0` (Normal) | `font-serif` (`Playfair` / `Amiri`) |
| **Section Heading** | `32px`–`40px` | `1.15` | `-0.02em` | `0` (Normal) | `font-serif` (`Playfair` / `Amiri`) |
| **Card Title** | `20px`–`24px` | `1.2` | `-0.02em` | `0` (Normal) | `font-serif` (`Playfair` / `Amiri`) |
| **Body Standard** | `14px`–`15px` | `1.5`–`1.6` | `-0.01em` | `0` (Leading `1.7`) | `font-sans` (`Inter` / `Almarai`) |
| **Captions / Micro** | `11px`–`12px` | `1.4` | `0` | `0` | `font-sans` (`Inter` / `Almarai`) |
| **Metadata Tag** | `10px`–`11px` | `1.0` | `0.08em` (UPPERCASE) | `0` (Normal case) | `font-mono` / `font-sans` |

#### Crucial BiDi & Arabic Rules
1. **No Negative Tracking on Arabic**: Arabic letters are cursive and physically join. Never apply `tracking-tight` or negative letter spacing to Arabic text (`rtl:tracking-normal`).
2. **Line Heights**: Arabic script has taller ascenders and descenders. Always add `rtl:leading-[1.6]` to `rtl:leading-[1.7]` on Arabic paragraphs.
3. **Numerals & Parentheses**: Use `<bdi dir="ltr">` or wrap review counts and currency numbers to prevent BiDi flipping in RTL context. Example:
   ```jsx
   <span dir="ltr"><bdi>({ratingCount})</bdi></span>
   ```
4. **Directional Arrow Icons**: Action arrows (e.g., `ArrowRight`, `ArrowUpRight`) must flip in RTL using `rtl:rotate-180` or `rtl:-scale-x-100`.

---

### 2.3 Shapes, Borders & Elevation

| Element | Border Radius | Border Style | Shadow / Treatment |
|---------|---------------|--------------|-------------------|
| **Cards (`VenueCard`, Feature Card)** | `9px` (`rounded-[9px]`) or `16px` | `1px solid #dfdcd5` (Dark: `#2e2d28`) | Flat default; `hover:shadow-xl hover:border-[#000000]` |
| **Buttons / CTA Pills** | `28.8px` (`rounded-full`) | None or `1px solid #dfdcd5` | Flat solid pill; hover `translateY(-1px)` |
| **Floating Nav / Cockpits** | `24px`–`32px` (`rounded-3xl`) | `1px solid rgba(0,0,0,0.08)` | Frosted glass backdrop blur (`backdrop-blur-xl`) |
| **Input Fields & Selectors** | `12px` (`rounded-xl`) | `1px solid #dfdcd5` (Dark: `#2e2d28`) | `focus:border-[#000000] focus:ring-1` |
| **Badges** | `9999px` (`rounded-full`) | `1px solid currentColor/20` | Compact capsule with optional pulsing ping dot |

---

### 2.4 Tactile Audio-Haptic Engine (`sound.js`)

WEDDO features an integrated Web Audio API sound synthesizer. Every new feature should trigger the appropriate haptic sound:

```javascript
import { sound } from '@/lib/sound'

// 1. Interactive clicks, tabs, filters, and sliders
sound.tap()       // 420Hz -> 140Hz subtle sine tap (40ms)

// 2. Bookmark, Shortlist, Compare, Success toast, Form completion
sound.success()   // C5 -> E5 -> C6 dual-oscillator acoustic chime (220ms)

// 3. Modal open, drawer open, accordion expand
sound.pop()       // 260Hz -> 580Hz soft triangle bubble pop (60ms)
```

---

## 3. Component Directory & Usage Guide

Below is the complete inventory of components currently active in WEDDO. When building new features, reuse these components and patterns.

```
src/
├── components/
│   ├── ui/                           # Primitives & WebGL / React Bits widgets
│   │   ├── BorderGlow.jsx            # Cursor-tracking radial border glow
│   │   ├── BubbleMenu.jsx            # Expanding circular pill navigation
│   │   ├── CircularGallery.jsx       # 3D WebGL curved cards gallery
│   │   ├── GridMotion.jsx            # Parallax continuous image grid
│   │   ├── Stepper.jsx               # Multi-step progress wizard
│   │   ├── badge.jsx                 # Capsule badges (live, gold, emerald)
│   │   ├── card.jsx                  # Semantic card primitives
│   │   ├── hover-card.jsx            # Radix hover card preview
│   │   ├── slider.jsx                # Precision range slider
│   │   ├── tooltip.jsx               # Radix tooltip primitive
│   │   ├── tabs.jsx                  # Rounded pill tab switcher
│   │   ├── accordion.jsx             # Collapsible FAQ / feature disclosure
│   │   ├── animated-theme-toggler.jsx# View-transition theme switcher
│   │   └── text-animate.jsx          # Staggered typography animator
│   ├── VenueCard.jsx                 # Flagship estate card (3D tilt + @container)
│   ├── SearchCockpit.jsx             # Dual-mode search & slider cockpit
│   ├── HeroSection.jsx               # Full-bleed exhibition hero
│   ├── FoliaPlannerSection.jsx       # Event architecture & planning suite
│   ├── PricingSection.jsx            # Transparent rate cards & savings calculator
│   ├── WeddoLogo.jsx                 # Monoline circular monogram SVG
│   ├── Preloader.jsx                 # Initial exhibition intro curtain
│   ├── NavigationPreloader.jsx       # Inter-page route transition curtain
│   ├── LanguageTransition.jsx        # BiDi globe transition curtain
│   ├── SpotlightSearchModal.jsx      # Global ⌘K search palette
│   ├── VenueDetailsModal.jsx         # Full estate detail inspection modal
│   ├── CompareDrawer.jsx             # Side-by-side venue compare dock
│   ├── InquiryModal.jsx              # Direct booking inquiry modal
│   ├── InquiriesConversationDrawer.jsx # Direct venue chat drawer
│   ├── OwnerDashboardModal.jsx       # Estate manager & date blackout modal
│   ├── AdminReviewModal.jsx          # Civil defense & permit inspection modal
│   └── Footer.jsx                    # Editorial archival footer
```

---

### 3.1 Global Navigation & Brand Elements

#### `BubbleMenu` (`src/components/BubbleMenu/BubbleMenu.jsx`)
Floating navigation component adapted from React Bits. Displays the brand logo, expands navigation route bubbles with spring easing, and embeds top-right utility buttons.
- **Props**:
  - `logo`: React element (`<WeddoLogo />`).
  - `items`: Array of navigation routes with labels, subtitles, rotation angles, and dark/light hover styles.
  - `menuBg`: Background color (`#e7e5e4` / `#1c1b18`).
  - `menuContentColor`: Ink color (`#000000` / `#f5f5f3`).
  - `navExtras`: Injected utilities (Language Globe toggle and `AnimatedThemeToggler`).
  - `onItemSelect`: Callback receiving the selected route.

#### `WeddoLogo` (`src/components/WeddoLogo.jsx`)
Archival monoline logo featuring the circled "W" monogram with Roman 75°/105° entablature downstrokes and Anime.js hover bounce.
- **Props**:
  - `size`: `'sm'` | `'default'` | `'lg'`.
  - `dark`: Boolean for dark mode ink.
  - `lang`: `'en'` | `'ar'` (displays localized typography lockup).

#### `AnimatedThemeToggler` (`src/components/ui/animated-theme-toggler.jsx`)
Dark / Light mode toggle using the modern browser View Transitions API for a circular wipe animation centered on the toggle button.
- **Props**:
  - `theme`: `'light'` | `'dark'`.
  - `onThemeChange`: `(nextTheme) => void`.
  - `variant`: `'circle'` | `'swipe'`.

---

### 3.2 Motion, Transition & Preloaders

#### `Preloader` (`src/components/Preloader.jsx`)
Initial Awwwards-style exhibition preloader displaying 4 milestones of cataloging Egyptian estates with a GSAP architectural curtain wipe.

#### `NavigationPreloader` (`src/components/NavigationPreloader.jsx`)
Between-pages transitional curtain that plays when switching hash routes (`#/venues`, `#/planning`, `#/pricing`, `#/vendor-ops`, `#/compliance`). Shows route code, localized badge, and smooth scroll restoration.

#### `LanguageTransition` (`src/components/LanguageTransition.jsx`)
Custom directional transition for language switching between English (LTR) and Arabic (RTL) with a central rotating globe medallion.

---

### 3.3 Visual & Media Widgets

#### `BorderGlow` (`src/components/ui/BorderGlow.jsx`)
React Bits component that renders an interactive, cursor-tracking radial glow along card borders. Used on the Trust Manifesto and search cockpits.
- **Example Usage**:
  ```jsx
  <BorderGlow
    edgeSensitivity={30}
    glowColor={isDark ? "40 80 80" : "220 95 50"}
    backgroundColor={isDark ? '#1c1b18' : '#e7e5e4'}
    borderRadius={24}
    glowRadius={42}
    glowIntensity={isDark ? 1.1 : 1.3}
    colors={isDark ? ['#d4af37', '#f472b6', '#38bdf8'] : ['#1e40af', '#2563eb', '#38bdf8']}
  >
    <div className="p-8">...Content...</div>
  </BorderGlow>
  ```

#### `GridMotion` (`src/components/ui/GridMotion.jsx`)
Multi-row continuous inertia image grid driven by mouse velocity and touch swiping. Serves as the atmospheric visual backdrop for the hero exhibition.

#### `CircularGallery` (`src/components/ui/CircularGallery.jsx`)
High-performance WebGL (OGL) curved 3D photo carousel with interactive drag, active card theme border glow, and full-screen inspection mode.

---

### 3.4 Discovery & Catalog Components

#### `VenueCard` (`src/components/VenueCard.jsx`)
The core estate exhibition card used across `HomePage`, `VenuesPage`, and `VenueCatalog`.
- **Key Features**:
  - **3D Parallax Tilt**: GSAP mouse-move tilt on desktop (`hover:hover`).
  - **Anime.js Micro-Feedback**: Spring elasticity on Shortlist and Compare button taps.
  - **BiDi-Protected Ratings**: Prevents parenthesis flip in RTL Arabic using `<bdi dir="ltr">`.
  - **Container Query Responsive Footer (`@container`)**:
    - Cards `< 440px`: Two-tier layout with full-width price on row 1, 2-column balanced buttons on row 2.
    - Cards `≥ 440px`: Inline side-by-side layout with left-aligned price and right-aligned buttons.
- **Props**:
  - `venue`: Venue data object.
  - `lang`: `'en'` | `'ar'`.
  - `isShortlisted`: Boolean.
  - `onToggleShortlist`: `(venueId) => void`.
  - `isCompared`: Boolean.
  - `onToggleCompare`: `(venueId) => void`.
  - `onSelectDetails`: `(venue) => void`.
  - `onQuickInquire`: `(venue, spaceId?, packageId?) => void`.
  - `t`: Translations dictionary.

#### `SearchCockpit` (`src/components/SearchCockpit.jsx`)
Dual-mode search bar embedded in the hero. Supports discrete dropdown filters (Area, Date, Category, Guests, Budget) and a toggleable "Precision Sliders" mode powered by `Slider`.

#### `SpotlightSearchModal` (`src/components/SpotlightSearchModal.jsx`)
Global quick-find dialog invoked via `⌘K` / `Ctrl+K` or search icons. Offers instant fuzzy filtering across all venues, spaces, and regions.

---

### 3.5 Planning, Folia Suite & Stepper

#### `FoliaPlannerSection` (`src/components/FoliaPlannerSection.jsx`)
Interactive 4-part event planning suite driven by `Stepper`:
1. **Dream Board (Moodboard)**: Visual color swatches (Royal Emerald, Gilded Gold, Jasmine Lotus, Mediterranean Azure), sticky notes, and comment threads.
2. **Interactive Seating Chart**: Banquet 10-top round tables, Royal Kosha head table, and boardroom layouts with live seat capacity counts.
3. **Smart Budget Allocator**: Real-time EGP distribution across Venue, Catering, Photography, Decor, and Entertainment with interactive sliders.
4. **Vendor Invoices & Contracts**: Milestone trackers, deposit schedules, and PDF contract download triggers.

#### `Stepper` (`src/components/ui/Stepper.jsx`)
Wizard navigation bar with step capsules, progress indicators, checkmark icons, and next/prev controls themed for Putty and Ink.

---

### 3.6 Overlays, Drawers & Modals

#### `VenueDetailsModal` (`src/components/VenueDetailsModal.jsx`)
Comprehensive venue profile modal:
- Photo gallery carousel with full-screen viewer.
- Spaces breakdown with capacity, square meters, and minimum spend.
- Guide price packages with explicit amenity inclusions.
- 360° Virtual Tour launcher and direct inquiry trigger.

#### `CompareDrawer` (`src/components/CompareDrawer.jsx`)
Side-by-side drawer comparing up to 3 selected estates across capacities, starting rates, sound curfews, bridal suite access, and civil defense status.

#### `InquiryModal` (`src/components/InquiryModal.jsx`)
Formal reservation request modal with validation for date, session, guest band, selected space, package, and contact details.

#### `InquiriesConversationDrawer` (`src/components/InquiriesConversationDrawer.jsx`)
Direct messaging drawer between couple and estate coordinator with chat bubbles, timestamps, and quick reply actions.

#### `OwnerDashboardModal` & `AdminReviewModal`
- `OwnerDashboardModal`: Estate management tool for setting blackout dates, updating spaces, and reviewing tasting requests.
- `AdminReviewModal`: Platform operator portal for verifying Civil Defense certificates, sound permits, and approving new submissions.

---

### 3.7 UI Primitives (`src/components/ui/`)

#### `Badge` (`src/components/ui/badge.jsx`)
Capsule tag supporting variants:
- `variant="default"`: Filled black badge.
- `variant="secondary"`: Bone background with hairline border.
- `variant="live"`: Displays a green pulsing ping radar dot (`pulse={true}`).
- `variant="gold"`: Warm beige with antique gold text for royal tiers.
- `variant="emerald"`: Deep forest emerald for certified security.

#### `Slider` (`src/components/ui/slider.jsx`)
Radix UI continuous slider with custom `#dfdcd5` track, `#000000` filled range, and grab-interactive thumb.

#### `Tabs` (`src/components/ui/tabs.jsx`)
Pill tab bar with animated active pill capsule background.

#### `Tooltip` & `HoverCard` (`src/components/ui/tooltip.jsx`, `hover-card.jsx`)
Radix UI micro-information overlays for action icon explanations and live venue partner previews.

---

## 4. Boilerplates for New Features

When building a new section, modal, or page, copy these canonical code patterns.

### 4.1 New Page Shell Pattern

```jsx
import React from 'react'
import { sound } from '@/lib/sound'

export function MyNewPage({ lang, t, theme }) {
  const isDark = theme === 'dark'

  return (
    <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#dfdcd5] dark:border-[#2e2d28] gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#595855] dark:text-[#a8a69e] block mb-2">
            {lang === 'ar' ? 'تصنيف الميزة' : 'FEATURE CATEGORY'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#000000] dark:text-[#f5f5f3] font-normal tracking-tight">
            {lang === 'ar' ? 'عنوان الصفحة الأرشيفي' : 'Archival Feature Heading'}
          </h1>
        </div>
        <p className="text-sm text-[#595855] dark:text-[#a8a69e] max-w-md font-sans leading-relaxed">
          {lang === 'ar'
            ? 'وصف توضيحي يعتمد خط المراعي ومسافات أسطر مريحة بدون تضييق حروف.'
            : 'Descriptive subtitle following the editorial gallery aesthetic with refined line-height.'}
        </p>
      </div>

      {/* 2. Feature Content Container */}
      <div className="bg-[#e7e5e4] dark:bg-[#1c1b18] rounded-2xl border border-[#dfdcd5] dark:border-[#2e2d28] p-6 sm:p-8">
        {/* Feature UI goes here */}
      </div>
    </div>
  )
}
```

### 4.2 Standard Primary & Secondary Action Buttons

```jsx
// Primary Solid Pill CTA
<button
  onClick={() => {
    sound.tap()
    handleAction()
  }}
  className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] min-h-[44px] px-5 flex items-center gap-2 cursor-pointer select-none text-xs font-medium"
>
  <span>{lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Action'}</span>
  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
</button>

// Secondary Ghost / Border Pill Button
<button
  onClick={() => {
    sound.tap()
    handleSecondary()
  }}
  className="tap-bounce px-4 py-2 min-h-[44px] rounded-full text-xs font-medium bg-white dark:bg-[#282723] text-[#000000] dark:text-[#f5f5f3] hover:bg-[#dfdcd5] dark:hover:bg-[#34332e] border border-[#dfdcd5] dark:border-[#2e2d28] transition-colors cursor-pointer select-none"
>
  {lang === 'ar' ? 'عرض التفاصيل' : 'Details'}
</button>
```

### 4.3 Interactive Card with Container Query

```jsx
<div className="@container group relative rounded-[9px] bg-[#e7e5e4] dark:bg-[#1c1b18] border border-[#dfdcd5] dark:border-[#2e2d28] p-5 flex flex-col justify-between hover:border-[#000000] dark:hover:border-[#f5f5f3] transition-all">
  <div>
    <span className="font-mono text-[11px] text-[#595855] dark:text-[#a8a69e] uppercase">
      {category}
    </span>
    <h3 className="font-serif text-xl text-[#000000] dark:text-[#f5f5f3] mt-1 mb-2">
      {title}
    </h3>
    <p className="text-xs text-[#595855] dark:text-[#a8a69e] leading-relaxed">
      {description}
    </p>
  </div>

  {/* Adaptive Footer using @container */}
  <div className="pt-4 mt-6 border-t border-[#dfdcd5] dark:border-[#2e2d28] flex flex-col @[400px]:flex-row @[400px]:items-center justify-between gap-3">
    <div className="flex items-baseline justify-between @[400px]:flex-col">
      <span className="text-[10px] font-mono text-[#595855] dark:text-[#a8a69e] uppercase">
        {lang === 'ar' ? 'القيمة' : 'Rate'}
      </span>
      <span className="font-serif text-base text-[#000000] dark:text-[#f5f5f3] whitespace-nowrap">
        {formatEGP(amount, lang)}
      </span>
    </div>
    <button className="btn-pill-ink dark:bg-[#f5f5f3] dark:text-[#0b0b0a] text-xs py-2 px-4 rounded-full">
      {lang === 'ar' ? 'اختيار' : 'Select'}
    </button>
  </div>
</div>
```

---

## 5. Design System Do's & Don'ts

### Do:
- **Do** maintain the unified background canvas (`#c4c3b6` in Light Mode, `#121210` in Dark Mode) across all sections and pages.
- **Do** pair `Playfair Display` / `Amiri` for headings and `Inter` / `Almarai` for body text.
- **Do** trigger Web Audio tactile clicks (`sound.tap()`, `sound.success()`, `sound.pop()`) on interactive operations.
- **Do** use `formatEGP(amount, lang)` for all currency formatting so English displays `240,000 EGP` and Arabic displays `٢٤٠,٠٠٠ ج.م`.
- **Do** isolate review numbers and ratings using `<bdi dir="ltr">` to prevent BiDi parenthesis inversion.
- **Do** flip directional arrow icons in RTL with `rtl:rotate-180` or `rtl:-scale-x-100`.
- **Do** use `@container` on card layouts so they reflow gracefully when placed in 2-column, 3-column, or mobile grids.

### Don't:
- **Don't** introduce saturated blues, purples, or neon greens as primary CTA colors. Buttons must remain pure ink (`#000000` / `#f5f5f3`).
- **Don't** use standard modern border radii like `8px` or `12px` on action buttons. Action buttons must use the pill radius (`rounded-full` / `28.8px`).
- **Don't** use negative letter spacing (`tracking-tight`) on Arabic text; Arabic script requires natural letter joining (`rtl:tracking-normal`).
- **Don't** use generic stark white (`#ffffff`) as large background surfaces in light mode; use Putty (`#c4c3b6`) or Bone (`#e7e5e4`).
- **Don't** introduce heavy drop shadows (`shadow-2xl`); depth is achieved through 1px hairline vellum borders and tone layering.
- **Don't** use stock illustrations or cartoon 3D emojis. Imagery should exclusively feature authentic architectural photography, heritage estates, and classical landscapes.

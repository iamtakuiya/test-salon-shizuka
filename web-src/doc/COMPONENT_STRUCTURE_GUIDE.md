# Component Structure & Naming Guide

> Salon Shizuka · React + TypeScript  
> Last updated: June 2026

---

## Core Rule

**Number sections. Don't number sub-components.**

```
01.HeroSection/          ← numbered  (page order)
  HeroSection.tsx
  components/
    HeroHeadline.tsx     ← not numbered
    HeroCta.tsx          ← not numbered
```

---

## Rationale

Numbering encodes **page order** — information that is stable and genuinely useful. Sub-component numbering encodes insertion order, which changes constantly. Every new sub-component shifts the sequence, causing rename churn, noisy git history, and broken imports across the codebase.

---

## Top-Level Section Order

```
src/components/organisms/
├── 01.HeroSection/
├── 02.ConceptSection/
├── 03.GallerySlider/
├── 04.OwnerSection/
├── 05.StyleGuideTeaser/
├── 06.MenuSection/
├── 07.VoiceSection/
├── 08.NewsletterBanner/
├── 09.ReservationForm/
├── 10.MapHours/
└── 11.Footer/
```

The number at the section level gives an immediate visual map of the page from top to bottom. Renumbering is rare — sections move far less often than sub-components are added.

---

## Inside Each Section

Sub-components are **not numbered**. They are named descriptively.

```
06.MenuSection/
├── MenuSection.tsx
├── MenuSection.module.scss
│
├── components/
│   ├── MenuHeader.tsx
│   ├── MenuTabs.tsx
│   ├── CategoryList.tsx
│   ├── CategoryCard.tsx
│   ├── MenuList.tsx
│   ├── FootNotes.tsx
│   └── index.ts          ← barrel export
│
├── hooks/
│   ├── useMenuTabs.ts
│   └── useMenuColumns.ts
│
├── utils/
│   └── formatPrice.ts
│
├── types.ts
└── index.ts
```

`MenuSection.tsx` is the **composition root** — it imports from `./components` and assembles the section. No business logic, no formatting, no data mapping lives here.

```tsx
// MenuSection.tsx — composition only
import { MenuHeader, MenuTabs, MenuList, FootNotes } from './components';

export default function MenuSection() {
  return (
    <Section id="menu">
      <Container>
        <Stack gap="xl">
          <MenuHeader />
          <MenuTabs />
          <MenuList />
          <FootNotes />
        </Stack>
      </Container>
    </Section>
  );
}
```

---

## Barrel Export Pattern

Every `components/index.ts` re-exports its siblings:

```ts
// 06.MenuSection/components/index.ts
export { MenuHeader }    from './MenuHeader';
export { MenuTabs }      from './MenuTabs';
export { CategoryList }  from './CategoryList';
export { CategoryCard }  from './CategoryCard';
export { MenuList }      from './MenuList';
export { FootNotes }     from './FootNotes';
```

The parent imports cleanly:

```tsx
import { MenuHeader, MenuTabs, MenuList, FootNotes } from './components';
```

---

## Why Sub-Component Numbering Fails

### Today

```
01.MenuHeader
02.MenuTabs
03.CategoryList
04.CategoryCard
05.MenuList
06.FootNotes
```

### After adding one component mid-sequence

```
01.MenuHeader
02.MenuHeroBanner    ← new
03.MenuTabs          ← renamed
04.CategoryList      ← renamed
05.CategoryCard      ← renamed
06.MenuList          ← renamed
07.FootNotes         ← renamed
```

Every rename is a file move, an import update, and a git diff line. Multiply by 10+ sections and this becomes a real maintenance cost.

---

## Atomic Design Layer Numbering (Exception)

Numbering top-level *category folders* is acceptable because categories rarely change:

```
src/components/
├── 01.primitives/
├── 02.atoms/
├── 03.molecules/
├── 04.organisms/
└── 05.templates/
```

Here the number acts as a **category rank**, not an insertion sequence. The distinction: if you could not imagine ever renumbering it, the number is probably encoding something stable and real.

---

## Quick Reference

| Level | Number? | Example |
|---|---|---|
| Page section | ✅ Yes | `06.MenuSection/` |
| Atomic category | ✅ Yes | `03.molecules/` |
| Sub-component | ❌ No | `MenuHeader.tsx` |
| Hook | ❌ No | `useMenuTabs.ts` |
| Util | ❌ No | `formatPrice.ts` |

---

## Complete Section Template

```
NN.SectionName/
├── SectionName.tsx            ← composition root
├── SectionName.module.scss    ← section-level styles only
│
├── components/
│   ├── SubComponentA.tsx
│   ├── SubComponentB.tsx
│   ├── SubComponentC.tsx
│   └── index.ts               ← barrel export
│
├── hooks/
│   └── useSectionLogic.ts
│
├── utils/
│   └── helperFn.ts
│
├── types.ts
└── index.ts                   ← re-exports SectionName as default
```

---

*This guide governs component naming and folder structure for Salon Shizuka. Update here when conventions change — do not maintain parallel notes.*

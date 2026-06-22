# Structural Primitives — Specification

> Salon Shizuka · React + TypeScript + Sass  
> Last updated: May 2026

---

## Overview

Structural Primitives are the lowest-level layout components in the component hierarchy. They own **structure only** — spacing, sizing, and arrangement. They carry no color, no typography, no business logic, and no appearance styles.

Every section, organism, and molecule in the project composes primitives as its structural skeleton. Business-specific styles layer on top via `className`.

### The Five-Layer Model

| Layer | Primitive | Responsibility |
|---|---|---|
| Section | `<Section>` | Vertical page rhythm (`padding-block` only) |
| Container | `<Container>` | Max-width + horizontal padding, centering |
| Layout | `<Stack>` `<Row>` `<Grid>` | Flex / grid arrangement of children |
| Wrapper | `<Box>` | Universal spacing, display, overflow |
| Element | — | Individual atom styles (not a primitive) |

---

## Primitive Index

| Component | HTML default | Primary use |
|---|---|---|
| `Box` | `div` | Universal wrapper, spacing, display |
| `Stack` | `div` | Vertical flex rhythm |
| `Row` | `div` | Horizontal flex alignment |
| `Grid` | `div` | CSS grid layouts |
| `Container` | `div` | Max-width + horizontal padding |
| `Section` | `section` | Full-width vertical rhythm blocks |

---

## Hard Rules

These rules apply to every primitive without exception.

1. **No appearance styles** — no `color`, `background`, `border`, `font`, `box-shadow`. The moment an appearance style enters a primitive, it becomes a component.
2. **No business logic** — no conditional rendering based on data, no Redux connections, no side effects.
3. **Always accept `className`** — the escape hatch for one-off overrides from consuming components.
4. **Always accept `as` prop** — renders the correct semantic HTML element without extra wrapper divs.
5. **Always forward `...rest`** — `aria-*`, `data-*`, `id`, event handlers all pass through cleanly.
6. **Prop values map to the design token scale** — spacing values are `xs | sm | md | lg | xl`, never raw numbers.

---

## `Box`

The universal wrapper. Use when no other primitive fits, or when you need a single element with controlled spacing and display.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `'div'` | Rendered HTML element |
| `padding` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | All-sides padding |
| `paddingBlock` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Top + bottom padding |
| `paddingInline` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Left + right padding |
| `display` | `'block' \| 'flex' \| 'grid' \| 'inline-flex' \| 'inline'` | — | CSS display value |
| `className` | `string` | — | Additional classes |

### Token → Value Map

| Token | Value |
|---|---|
| `xs` | `var(--space-2)` · 8px |
| `sm` | `var(--space-4)` · 16px |
| `md` | `var(--space-6)` · 24px |
| `lg` | `var(--space-8)` · 32px |
| `xl` | `var(--space-12)` · 48px |

### Usage

```tsx
// Basic wrapper with padding
<Box padding="md">
  <p>Content</p>
</Box>

// Renders as <li> — no extra div
<Box as="li" paddingBlock="sm" paddingInline="md">
  Menu item
</Box>

// Business styles via className
<Box display="flex" className={styles.card__body}>
  <p>Content</p>
</Box>
```

### Do / Don't

```tsx
// ✅ Correct — structure only
<Box paddingBlock="lg" display="flex">

// ❌ Wrong — appearance in primitive
<Box style={{ backgroundColor: '#FAF5EF' }}>

// ✅ Correct — semantic element via as
<Box as="article" padding="md">

// ❌ Wrong — unnecessary wrapper div
<div><Box padding="md">
```

---

## `Stack`

Vertical flex column with consistent gap between children. The default layout for any vertically stacked content — form fields, card bodies, section content.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `'div'` | Rendered HTML element |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between children |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | `align-items` value |
| `className` | `string` | — | Additional classes |

### Token → Value Map

| Token | Value |
|---|---|
| `xs` | `var(--space-2)` · 8px |
| `sm` | `var(--space-4)` · 16px |
| `md` | `var(--space-6)` · 24px |
| `lg` | `var(--space-8)` · 32px |
| `xl` | `var(--space-16)` · 64px |

### Usage

```tsx
// Vertical form fields
<Stack as="form" gap="md">
  <FormField label="Name" />
  <FormField label="Email" />
  <Button type="submit">Submit</Button>
</Stack>

// Card body content — centered
<Stack gap="sm" align="center">
  <h3 className={styles.card__title}>Cut & Style</h3>
  <p className={styles.card__price}>¥8,000</p>
</Stack>

// Section content — large gap
<Stack gap="xl">
  <ConceptSection />
  <GallerySection />
</Stack>
```

### Do / Don't

```tsx
// ✅ Correct — vertical rhythm only
<Stack gap="lg" align="center">

// ❌ Wrong — Stack is not a Row
<Stack style={{ flexDirection: 'row' }}>  // Use <Row> instead

// ✅ Correct — semantic list
<Stack as="ul" gap="sm">
  {items.map(item => <li key={item.id}>{item.label}</li>)}
</Stack>
```

---

## `Row`

Horizontal flex row with alignment and justification controls. Use for nav links, icon groups, form rows, any side-by-side arrangement.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `'div'` | Rendered HTML element |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Gap between children |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` | `align-items` (cross axis) |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` | `justify-content` (main axis) |
| `wrap` | `boolean` | `false` | Allow children to wrap |
| `className` | `string` | — | Additional classes |

### Token → Value Map

| Token | Value |
|---|---|
| `xs` | `var(--space-2)` · 8px |
| `sm` | `var(--space-4)` · 16px |
| `md` | `var(--space-6)` · 24px |
| `lg` | `var(--space-8)` · 32px |

### Usage

```tsx
// Header navbar — space between logo and nav
<Row justify="between" align="center" className={styles.header__navbar}>
  <Logo />
  <nav>...</nav>
</Row>

// Nav link list
<Row as="ul" gap="lg" align="center">
  {NAV_LINKS.map(link => (
    <li key={link.label}>
      <a href={link.href}>{link.label}</a>
    </li>
  ))}
</Row>

// Social icons
<Row gap="sm">
  {SOCIAL_LINKS.map(({ label, href, icon }) => (
    <a key={label} href={href} aria-label={label}>
      <Icon icon={icon} />
    </a>
  ))}
</Row>

// Wrapping tag cloud
<Row gap="xs" wrap>
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Row>
```

### Do / Don't

```tsx
// ✅ Correct — horizontal arrangement
<Row justify="between" align="center">

// ❌ Wrong — Row is not a Stack
<Row style={{ flexDirection: 'column' }}>  // Use <Stack> instead

// ✅ Correct — semantic nav list
<Row as="ul" gap="md">

// ❌ Wrong — hardcoded gap
<Row style={{ gap: '12px' }}>  // Use gap="sm" token instead
```

---

## `Grid`

CSS grid layout with configurable columns and gap. Use for gallery grids, service card grids, any multi-column content that needs responsive reflow.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `'div'` | Rendered HTML element |
| `cols` | `1 \| 2 \| 3 \| 4` | `1` | Column count at base (mobile) |
| `colsTablet` | `1 \| 2 \| 3 \| 4` | — | Column count at 768px+ |
| `colsLaptop` | `1 \| 2 \| 3 \| 4` | — | Column count at 1024px+ |
| `gap` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Gap between cells |
| `className` | `string` | — | Additional classes |

### Responsive Column Map

| Breakpoint | CSS |
|---|---|
| Base (mobile) | `grid-template-columns: repeat(cols, 1fr)` |
| `colsTablet` | `@media (min-width: 768px)` |
| `colsLaptop` | `@media (min-width: 1024px)` |

### Usage

```tsx
// Service menu cards — 1 col mobile, 2 tablet, 3 laptop
<Grid cols={1} colsTablet={2} colsLaptop={3} gap="lg">
  {SERVICES.map(service => (
    <ServiceCard key={service.id} {...service} />
  ))}
</Grid>

// Gallery — 2 col mobile, 3 laptop
<Grid cols={2} colsLaptop={3} gap="sm">
  {GALLERY.map(image => (
    <GalleryImage key={image.id} {...image} />
  ))}
</Grid>

// Style guide teaser — 2x2 always
<Grid cols={2} gap="xs">
  {STYLE_IMAGES.map(img => <img key={img.id} src={img.src} alt={img.alt} />)}
</Grid>
```

### Do / Don't

```tsx
// ✅ Correct — responsive columns via props
<Grid cols={1} colsTablet={2} colsLaptop={3}>

// ❌ Wrong — CSS in JSX
<Grid style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>

// ✅ Correct — gap from token scale
<Grid gap="lg">

// ❌ Wrong — appearance style on grid
<Grid className={styles.gallery} style={{ backgroundColor: '#000' }}>
// backgroundColor belongs in styles.gallery, not on the primitive
```

---

## `Container`

Controls max-width and horizontal padding. Always nested inside a `Section` or full-width element. Never adds vertical spacing.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `'div'` | Rendered HTML element |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Max-width variant |
| `className` | `string` | — | Additional classes |

### Size Map

| Token | Max-width | Primary use |
|---|---|---|
| `sm` | `640px` | Narrow prose, forms, centered CTAs |
| `md` | `960px` | Blog-style content, mid-width sections |
| `lg` | `1280px` | Standard page content (default) |
| `xl` | `1440px` | Wide editorial, hero content |
| `full` | `100%` | Full-bleed layouts that still need padding |

### Horizontal Padding (responsive)

| Breakpoint | Padding |
|---|---|
| Mobile (default) | `var(--space-6)` · 24px |
| Tablet 768px+ | `var(--space-8)` · 32px |
| Laptop 1024px+ | `var(--space-12)` · 48px |

### Usage

```tsx
// Standard section content
<section className={styles.concept}>
  <Container>
    <ConceptContent />
  </Container>
</section>

// Narrow reservation form
<section className={styles.reservation}>
  <Container size="md">
    <ReservationForm />
  </Container>
</section>

// Wide hero — xl container
<section className={styles.hero}>
  <Container size="xl">
    <HeroContent />
  </Container>
</section>
```

### Do / Don't

```tsx
// ✅ Correct — Container inside Section/header/footer
<header className={styles.header}>
  <Container>
    <Row justify="between">...</Row>
  </Container>
</header>

// ❌ Wrong — Container wrapping Container
<Container>
  <Container size="md">  // Nest a narrower element instead
  </Container>
</Container>

// ✅ Correct — no vertical padding on Container
<Container>  // Vertical spacing is Section's job

// ❌ Wrong — vertical spacing on Container
<Container style={{ paddingBlock: '4rem' }}>
```

---

## `Section`

Full-width vertical rhythm block. Adds `padding-block` only — never horizontal padding. Use for every major page section. Always pairs with `Container` for content width control.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `spacing` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Vertical padding scale |
| `id` | `string` | — | Anchor target for nav links |
| `className` | `string` | — | Additional classes (backgrounds, borders) |
| `aria-label` | `string` | — | Accessible region label |

### Spacing Map

| Token | Mobile `padding-block` | Laptop `padding-block` |
|---|---|---|
| `sm` | `var(--space-8)` · 32px | `var(--space-12)` · 48px |
| `md` | `var(--space-12)` · 48px | `var(--space-16)` · 64px |
| `lg` | `var(--space-16)` · 64px | `var(--space-24)` · 96px |

### Usage

```tsx
// Standard section with anchor
<Section id="concept" aria-label="Concept">
  <Container>
    <ConceptContent />
  </Container>
</Section>

// Full-bleed background via className
<Section
  id="reservation"
  spacing="lg"
  className={styles.reservationSection}  // ← background color lives here
>
  <Container size="md">
    <ReservationForm />
  </Container>
</Section>

// Tighter spacing for smaller blocks
<Section spacing="sm">
  <Container>
    <NewsletterBanner />
  </Container>
</Section>
```

### Do / Don't

```tsx
// ✅ Correct — Section wraps Container wraps content
<Section id="menu">
  <Container>
    <MenuContent />
  </Container>
</Section>

// ❌ Wrong — horizontal padding on Section
<Section style={{ paddingInline: '2rem' }}>  // Container's job

// ✅ Correct — background via className
<Section className={styles.darkSection}>  // styles.darkSection has background

// ❌ Wrong — background inline on Section
<Section style={{ backgroundColor: '#3D3733' }}>
```

---

## Composition Patterns

### Standard Section Pattern

Every page section follows this nesting:

```tsx
<Section id="concept" aria-label="Concept">         {/* vertical rhythm */}
  <Container>                                         {/* max-width + h-padding */}
    <Stack gap="xl">                                  {/* vertical content flow */}
      <Stack gap="xs" align="center">                 {/* label + heading group */}
        <span className={styles.sectionLabel}>CONCEPT</span>
        <h2 className={styles.sectionHeading}>静けさの中の美しさ</h2>
      </Stack>
      <Grid cols={1} colsLaptop={2} gap="lg">         {/* content grid */}
        <ConceptText />
        <ConceptImage />
      </Grid>
    </Stack>
  </Container>
</Section>
```

### Header Pattern

```tsx
<header className={styles.header}>                   {/* fixed, z-index, backdrop */}
  <Container>                                         {/* max-width + h-padding */}
    <Row justify="between" align="center">            {/* logo ↔ nav layout */}
      <LogoWrapper />
      <DesktopNav />
      <SocialLinks />
      <HamburgerButton />
    </Row>
  </Container>
</header>
```

### Form Pattern

```tsx
<Section id="reservation" spacing="lg">
  <Container size="md">
    <Stack gap="xl">
      <SectionHeader />
      <Stack as="form" gap="md">                      {/* form = Stack */}
        <Row gap="md" wrap>                            {/* field row */}
          <FormField label="お名前" />
          <FormField label="メールアドレス" />
        </Row>
        <FormField label="ご要望" as="textarea" />
        <Row justify="end">                            {/* button row */}
          <Button type="submit">予約する</Button>
        </Row>
      </Stack>
    </Stack>
  </Container>
</Section>
```

---

## File Structure

```
src/components/primitives/
├── Box/
│   ├── Box.tsx
│   └── Box.module.scss
├── Stack/
│   ├── Stack.tsx
│   └── Stack.module.scss
├── Row/
│   ├── Row.tsx
│   └── Row.module.scss
├── Grid/
│   ├── Grid.tsx
│   └── Grid.module.scss
├── Container/
│   ├── Container.tsx
│   └── Container.module.scss
├── Section/
│   ├── Section.tsx
│   └── Section.module.scss
└── index.ts                    ← barrel export
```

All imports use the barrel:

```ts
import { Box, Stack, Row, Grid, Container, Section } from '@/components/primitives';
```

---

## What Belongs in `className`, Not Props

Primitives intentionally have a small prop surface. Use `className` from the consuming component's module for anything beyond structure:

| Need | Approach |
|---|---|
| Background color | `className={styles.hero}` where `.hero { background: ... }` |
| Border | `className={styles.card}` where `.card { border: ... }` |
| One-off margin | `className={styles.offset}` where `.offset { margin-top: ... }` |
| GSAP target ref | Pass `ref` — it forwards through `...rest` |
| Transition | Belongs in the consuming component's SCSS |
| `overflow: hidden` | `className` from the consumer |

---

## Decision Guide

When you need a layout element, choose by asking:

```
Is it a full-width page block with vertical rhythm?
  └── Yes → <Section>

Does it need max-width and horizontal centering?
  └── Yes → <Container> (inside Section or header/footer)

Are children stacked vertically?
  └── Yes → <Stack>

Are children arranged horizontally?
  └── Yes → <Row>

Is it a multi-column grid?
  └── Yes → <Grid>

None of the above — need padding/display on one element?
  └── <Box>
```

---

*This document is the authoritative specification for Salon Shizuka structural primitives. Update this file when props or tokens change — do not maintain separate documentation.*

# Frontend Architecture Specification

> Salon Shizuka · React + TypeScript + Sass  
> Last updated: May 2026

---

## 1. Architectural Philosophy

The frontend architecture enforces a strict separation between five concerns:

```
Structure        → Primitives
Appearance       → Surface Layer
Status           → Feedback Layer
Meaning          → Semantic Components
Business Logic   → Features
Composition      → Templates / Pages
```

The system is built around two complementary ideas:

```
Headless Structural Primitives
          +
Semantic Visual Layers
```

This separation exists to:

- prevent primitive bloat
- isolate appearance from layout
- simplify GSAP orchestration
- keep business styling out of infrastructure
- maintain long-term scalability

---

## 2. Layer Hierarchy

```
Primitives
    ↓
Surface Layer
    ↓
Feedback Layer
    ↓
Semantic Components  (Atoms → Molecules → Organisms)
    ↓
Features
    ↓
Templates / Pages
```

| Layer | Responsibility |
|---|---|
| Primitives | Structure, spacing, layout |
| Surface Layer | Reusable appearance containers |
| Feedback Layer | Status communication |
| Semantic Components | Reusable UI with meaning |
| Features | Business behavior |
| Templates | Page composition |

---

## 3. Dependency Rules

### Allowed

```
Template → Feature → Organism → Molecule → Atom
                                    ↓
                                 Surface
                                    ↓
                                Primitive
```

### Forbidden

```
Primitive  →  Surface          (primitives never import surfaces)
Primitive  →  Business Logic   (primitives are stateless)
Surface    →  Feature State    (surfaces carry no domain knowledge)
Feedback   →  API Logic        (feedback only receives props)
```

---

## 4. Folder Structure

```
src/components/
├── primitives/
│   ├── Box/
│   ├── Stack/
│   ├── Row/
│   ├── Grid/
│   ├── Container/
│   └── Section/
│
├── surfaces/
│   ├── Surface/
│   ├── Card/
│   ├── Panel/
│   ├── Overlay/
│   └── Divider/
│
├── feedback/
│   ├── Alert/
│   ├── Toast/
│   ├── EmptyState/
│   ├── LoadingBlock/
│   └── InlineError/
│
├── atoms/
├── molecules/
├── organisms/
├── features/
└── templates/
```

---

## 5. Primitive Layer

### Philosophy

Structural primitives are infrastructure. They answer:

```
"How is this arranged?"
```

Not:

```
"What does this look like?"
```

### What Primitives Own

```scss
// ✅ Allowed
display: flex;
gap: 1rem;
overflow: hidden;
min-width: 0;
box-sizing: border-box;
padding: ...;     // spacing tokens only
```

```scss
// ❌ Forbidden
background: white;
box-shadow: ...;
border-radius: ...;
color: ...;
border: ...;
font-family: ...;
```

### Hard Rules

These apply to every primitive without exception.

1. **No appearance styles** — no `color`, `background`, `border`, `font`, `box-shadow`. The moment an appearance style enters a primitive, it becomes a component.
2. **No business logic** — no conditional rendering based on data, no Redux connections, no side effects.
3. **Always accept `className`** — the escape hatch for one-off overrides from consuming components.
4. **Always accept `as` prop** — renders the correct semantic HTML element without extra wrapper divs.
5. **Always forward `...rest`** — `aria-*`, `data-*`, `id`, event handlers pass through cleanly.
6. **Internal variable named `Comp`** — never `Tag` or `Element`, which collide with atom names and global types.
7. **Prop values map to design token scale** — spacing values are `xs | sm | md | lg | xl`, never raw numbers.

### Primitive Index

| Component | HTML default | Primary use |
|---|---|---|
| `Box` | `div` | Universal wrapper, spacing, display |
| `Stack` | `div` | Vertical flex rhythm |
| `Row` | `div` | Horizontal flex alignment |
| `Grid` | `div` | CSS grid layouts |
| `Container` | `div` | Max-width + horizontal padding |
| `Section` | `section` | Full-width vertical rhythm blocks |

All imports use the barrel export:

```ts
import { Box, Stack, Row, Grid, Container, Section } from '@/components/primitives';
```

---

## 6. `Box`

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

## 7. `Stack`

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

// Card body — centered
<Stack gap="sm" align="center">
  <h3 className={styles.card__title}>Cut & Style</h3>
  <p className={styles.card__price}>¥8,000</p>
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

## 8. `Row`

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
  <LogoWrapper />
  <DesktopNav />
</Row>

// Nav link list
<Row as="ul" gap="lg" align="center">
  {NAV_LINKS.map(link => (
    <li key={link.label}>
      <a href={link.href}>{link.label}</a>
    </li>
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

## 9. `Grid`

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
// Service cards — 1 col mobile, 2 tablet, 3 laptop
<Grid cols={1} colsTablet={2} colsLaptop={3} gap="lg">
  {SERVICES.map(service => (
    <ServiceCard key={service.id} {...service} />
  ))}
</Grid>

// Style guide teaser — 2×2 always
<Grid cols={2} gap="xs">
  {STYLE_IMAGES.map(img => (
    <img key={img.id} src={img.src} alt={img.alt} />
  ))}
</Grid>
```

### Do / Don't

```tsx
// ✅ Correct — responsive columns via props
<Grid cols={1} colsTablet={2} colsLaptop={3}>

// ❌ Wrong — CSS in JSX
<Grid style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>

// ✅ Correct — appearance via className only
<Grid className={styles.gallery}>

// ❌ Wrong — appearance inline on primitive
<Grid style={{ backgroundColor: '#000' }}>
```

---

## 10. `Container`

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
<Section className={styles.concept}>
  <Container>
    <ConceptContent />
  </Container>
</Section>

// Narrow reservation form
<Section>
  <Container size="md">
    <ReservationForm />
  </Container>
</Section>

// Wide hero
<Section className={styles.hero}>
  <Container size="xl">
    <HeroContent />
  </Container>
</Section>
```

### Do / Don't

```tsx
// ✅ Correct — Container inside Section
<Section>
  <Container>
    <Row justify="between">...</Row>
  </Container>
</Section>

// ❌ Wrong — Container wrapping Container
<Container>
  <Container size="md">
  </Container>
</Container>

// ❌ Wrong — vertical spacing on Container
<Container style={{ paddingBlock: '4rem' }}>
// Vertical spacing is Section's job
```

---

## 11. `Section`

Full-width vertical rhythm block. Adds `padding-block` only — never horizontal padding. Always pairs with `Container` for content width control.

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

// Full-bleed background via className — appearance never inline
<Section
  id="reservation"
  spacing="lg"
  className={styles.reservationSection}
>
  <Container size="md">
    <ReservationForm />
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
<Section style={{ paddingInline: '2rem' }}>
// Container's job

// ✅ Correct — background via className
<Section className={styles.darkSection}>

// ❌ Wrong — background inline on Section
<Section style={{ backgroundColor: '#3D3733' }}>
```

---

## 12. Surface Layer

### Philosophy

A Surface is a semantic visual container. It consumes primitives internally while owning reusable appearance patterns. Surfaces answer:

```
"What visual container does this content live in?"
```

Surfaces own:

- background
- border-radius
- borders
- shadows
- elevation

Surfaces do NOT own:

- business logic
- feature state
- layout arrangement (that is the primitive's job)

### Surface Index

| Component | Purpose |
|---|---|
| `Surface` | Foundational visual wrapper |
| `Card` | Elevated grouped content |
| `Panel` | Structured content section |
| `Overlay` | Layered UI surfaces |
| `Divider` | Visual separation |

### Surface Variants

| Variant | Purpose |
|---|---|
| `default` | Standard background |
| `muted` | Soft neutral grouping |
| `elevated` | Shadowed card |
| `dark` | Inverted theme |
| `overlay` | Floating layers |
| `glass` | Transparent blur layer |
| `bordered` | Minimal bordered block |

### Dependency Direction

```
Surface
    ↓
Box (primitive)
```

```
// ✅ Correct — Surface consumes a primitive
function Surface({ children, variant, padding }) {
  return (
    <Box padding={padding} className={clsx(styles.surface, styles[variant])}>
      {children}
    </Box>
  );
}

// ❌ Wrong — Primitive consuming a Surface
function Box({ children }) {
  return (
    <Surface>   // never
      {children}
    </Surface>
  );
}
```

### Usage

```tsx
// Service card in a muted surface
<Surface variant="muted" padding="md" radius="lg">
  <Stack gap="sm">
    <h3 className={styles.service__title}>Cut & Style</h3>
    <p className={styles.service__price}>¥8,000</p>
  </Stack>
</Surface>

// Mobile menu overlay
<Surface variant="overlay">
  <MobileMenu />
</Surface>
```

---

## 13. Feedback Layer

### Philosophy

Feedback components communicate system state to the user. They receive props only — no API calls, no Redux, no business logic.

### Feedback Index

| Component | Purpose |
|---|---|
| `Alert` | Inline status messaging |
| `Toast` | Temporary notifications |
| `EmptyState` | Missing content placeholder |
| `LoadingBlock` | Skeleton / loading state |
| `InlineError` | Form field validation |

### Usage

```tsx
// Reservation success state
<Alert variant="success">
  ご予約ありがとうございます。
</Alert>

// Form validation error
<InlineError>
  有効なメールアドレスを入力してください
</InlineError>

// Gallery loading state
<LoadingBlock height="400px" />
```

---

## 14. Appearance Ownership

Appearance must never live inside primitives. It belongs to surfaces, semantic components, section-level classes, and CSS Modules.

### Correct Layering Pattern

```tsx
<Section className={styles.hero}>
  <Container>
    <HeroContent />
  </Container>
</Section>
```

```scss
// Hero appearance lives entirely in the section's module
.hero {
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('/hero.webp') center / cover no-repeat;
  color: $color-white;
}
```

| Layer | Responsibility |
|---|---|
| `Section` | vertical spacing only |
| `Container` | width + horizontal padding |
| `HeroContent` | content |
| `.hero` | all appearance |

### `className` Escape Hatch

Primitives intentionally expose a small prop surface. Everything beyond structure is injected through `className`:

| Need | Approach |
|---|---|
| Background color | `className={styles.hero}` where `.hero { background: ... }` |
| Border | `className={styles.card}` where `.card { border: ... }` |
| One-off margin | `className={styles.offset}` where `.offset { margin-top: ... }` |
| GSAP target ref | Pass `ref` — forwards through `...rest` |
| Transition | Belongs in the consuming component's SCSS |
| `overflow: hidden` | `className` from the consumer |

---

## 15. GSAP Integration

Primitives are intentionally GSAP-friendly because layout is isolated, DOM structure is predictable, and appearance is decoupled.

GSAP targets semantic components, sections, and surfaces — never raw primitives directly.

```ts
// ✅ Target a semantic component or surface
gsap.fromTo(cardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 });

// ✅ Target a section's container element
gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1 });

// ❌ Never animate a primitive for appearance — it has no appearance to animate
gsap.to(boxRef.current, { backgroundColor: 'red' });
// backgroundColor belongs on a Surface or className, not a primitive
```

All GSAP logic lives in `src/animations/` — components never contain raw `gsap.to()` calls.

---

## 16. Composition Patterns

### Standard Section Pattern

```tsx
<Section id="concept" aria-label="Concept">
  <Container>
    <Stack gap="xl">
      <Stack gap="xs" align="center">
        <span className={styles.sectionLabel}>CONCEPT</span>
        <h2 className={styles.sectionHeading}>静けさの中の美しさ</h2>
      </Stack>
      <Grid cols={1} colsLaptop={2} gap="lg">
        <ConceptText />
        <ConceptImage />
      </Grid>
    </Stack>
  </Container>
</Section>
```

### Header Pattern

```tsx
<header className={styles.header}>
  <Container>
    <Row justify="between" align="center">
      <LogoWrapper />
      <DesktopNav />
      <SocialLinks items={SOCIAL_LINKS} />
      <HamburgerButton />
    </Row>
  </Container>
</header>
```

### Surface + Primitive Pattern

```tsx
// Surface provides appearance, primitive provides layout inside it
<Surface variant="muted" padding="md">
  <Stack gap="sm">
    <ReviewCard {...review} />
  </Stack>
</Surface>
```

### Form Pattern

```tsx
<Section id="reservation" spacing="lg">
  <Container size="md">
    <Stack gap="xl">
      <SectionHeader />
      <Stack as="form" gap="md">
        <Row gap="md" wrap>
          <FormField label="お名前" />
          <FormField label="メールアドレス" />
        </Row>
        <FormField label="ご要望" />
        <Row justify="end">
          <Button type="submit">予約する</Button>
        </Row>
      </Stack>
    </Stack>
  </Container>
</Section>
```

---

## 17. Decision Guide

### Which primitive do I use?

```
Is it a full-width page block with vertical rhythm?
  └── Yes → <Section>

Does it need max-width and horizontal centering?
  └── Yes → <Container>  (inside Section or header/footer)

Are children stacked vertically?
  └── Yes → <Stack>

Are children arranged horizontally?
  └── Yes → <Row>

Is it a multi-column grid?
  └── Yes → <Grid>

Need padding or display on one element, nothing else fits?
  └── <Box>
```

### Primitive or Surface?

```
Does it have background, border, shadow, or radius?
  └── Yes → Surface (or Surface variant)
  └── No  → Primitive
```

### Primitive or Atom?

```
Does it have color, typography, or visual identity?
  └── Yes → Atom  (Tag, Button, Link, Icon...)
  └── No  → Primitive
```

---

*This document is the single authoritative architecture reference for Salon Shizuka. Do not maintain parallel guides — update this one.*

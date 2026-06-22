Based on the project's own architecture spec, here's the reasoning:

---

**`useSlider.ts` → `src/animations/hooks/`**

It's not a component — it's a stateful animation-coordination hook. The `animations/hooks/` directory already holds `useScrollReveal.ts` and `useHeroAnimation.ts`. This belongs there, not in a component folder.

---

**`ImageSlider` → `src/components/molecules/ImageSlider/`**

It's a reusable UI unit with internal parts (arrows, dots, viewport) that compose together, but it carries no business domain knowledge. That's the molecule definition exactly. It's above an atom (too many moving parts) but below an organism (it doesn't assemble business sections — it's consumed by them).

---

**`SliderGrid` → `src/components/molecules/SliderGrid/`**

Same reasoning. It's a pure layout + rendering unit. No business logic, no section context. Multiple organisms consume it.

---

**`GallerySlider` → `src/components/organisms/GallerySlider/`**

It's a named section of the page. It assembles molecules (`ImageSlider`, `SliderGrid`) with section-level structure (`Section`, `Container`), heading copy, and scroll reveal animations. That's the organism definition.

---

**`StyleGuideTeaser` → `src/components/organisms/StyleGuideTeaser/`**

Same — it's a page section organism that happens to share the same molecules as `GallerySlider`.

---

**Summary**

```
src/
├── animations/
│   └── hooks/
│       └── useSlider.ts               ← was useScrollReveal, useHeroAnimation
│
└── components/
    ├── molecules/
    │   ├── ImageSlider/               ← reusable slider shell
    │   │   ├── ImageSlider.tsx
    │   │   ├── ImageSlider.module.scss
    │   │   └── index.ts
    │   └── SliderGrid/                ← reusable grid layout
    │       ├── SliderGrid.tsx
    │       ├── SliderGrid.module.scss
    │       └── index.ts
    │
    └── organisms/
        ├── GallerySlider/             ← page section
        │   ├── GallerySlider.tsx
        │   └── GallerySlider.module.scss
        └── StyleGuideTeaser/          ← page section
            ├── StyleGuideTeaser.tsx
            └── StyleGuideTeaser.module.scss
```

The spec's own decision guide confirms this: organisms are what "assemble business sections" from molecules and primitives. Molecules are reusable UI units with no domain knowledge. The `animations/hooks/` directory is already the established home for non-component hooks that coordinate with GSAP.
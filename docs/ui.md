# UI Components (shadcn/ui)

## Rules

- **Every UI element in this app must be a shadcn/ui component.** Do not create custom components.
- Do not hand-write, copy, or wrap shadcn components in new ones. If a needed element exists in shadcn/ui, use it directly.
- Do not use other UI libraries (MUI, Chakra, Mantine, Radix themes, etc.) or raw styled HTML equivalents of a shadcn component (e.g. a `<button>` instead of `Button`).
- Compose pages directly from shadcn components and semantic HTML for layout only (`div`, `main`, `section`, `h1`, `p`, etc.), styled with Tailwind utility classes.
- Clerk's own components (`SignInButton`, `UserButton`, etc.) are allowed for auth UI as specified in `/docs/auth.md`. Render shadcn `Button` as their trigger child where a button is needed.

## Adding Components

- Add components only with the shadcn CLI: `npx shadcn@latest add <component>`. They are generated into `components/ui/`.
- Never hand-edit or hand-write files in `components/ui/`.
- Before building any UI, check `components/ui/` for an existing component, and check the shadcn/ui component list for one that fits. Add it with the CLI if missing.
- Project config is in `components.json`: style `base-nova` (built on `@base-ui/react`), icon library `lucide-react`, CSS variables enabled.

## Styling

- Use Tailwind CSS v4 utility classes and the theme CSS variables in `app/globals.css`. No inline `style` props, CSS modules, or custom CSS for components.
- Use `cn` from `@/lib/utils` to merge class names.
- Customize via `className` and component `variant`/`size` props, not by modifying the generated component source.
- Use `lucide-react` for icons only.

## Imports

```tsx
import { Button } from "@/components/ui/button";
```

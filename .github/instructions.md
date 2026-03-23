# 🛠 Project Context: VaultWares

## 1. Core Tech Stack (flexible list)

*    Framework: Next.js 15+ (App Router)

*    Language: TypeScript (Strict mode)

*    Styling: Tailwind CSS with a dark-mode first approach.

*    State Management: TanStack Query (React Query) for server state; Zustand for local state.

*    Database/Backend: Supabase (PostgreSQL + Auth + Storage).

*    UI Components: Radix UI primitives / Shadcn UI.

## 2. Coding Standards & Patterns

*	When generating code for VaultWares, adhere to the following:

*   Component Architecture: Use Functional Components with Arrow Syntax. Favor Server Components for data fetching and Client Components only when interactivity is required.

*   Naming Conventions: 
** 		Components: PascalCase (e.g., ProductVault.tsx)**

**      Hooks: camelCase starting with 'use' (e.g., useVaultAuth.ts)**

**      Utilities: kebab-case (e.g., format-currency.ts)**

*    Type Safety: Avoid any at all costs. Use Zod for schema validation (especially for API responses and form inputs).

*    Performance: Implement React Suspense for loading states and utilize Next.js Image component for all assets.

## 3. Style Guide (Tailwind)

**View STYLE.md**

## 4. Specific Constraints for Gemini

*    Security First: Always sanitize user inputs. If writing SQL or Supabase queries, ensure Row Level Security (RLS) is considered.

*    Error Handling: Use a centralized error-boundary pattern. Don't just console.log(error); provide user-friendly feedback using a Toast component.

*    No Redundancy: Check @/components/ui before creating new UI elements to avoid duplicating Shadcn components.
# Portfolio

## Embedded Blog

This project now includes an embedded blog at:

- `/blog` - article listing page
- `/blog/[slug]` - article detail page

The blog uses the same design tokens, cursor, particles, and retro visual language as the main portfolio.

## Sanity CMS Setup

1. Copy `.env.example` to `.env.local`
2. Fill in:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - optional `SANITY_API_READ_TOKEN` (for private datasets)
3. Start dev server:

```bash
npm run dev
```

If Sanity env variables are missing, the blog automatically falls back to starter mock posts so the route still works.

## Suggested Sanity Post Schema

Use a `post` document with:

- `title` (string)
- `slug` (slug from title)
- `excerpt` (text)
- `publishedAt` (datetime)
- `tags` (array of strings)
- `coverImage` (image)
- `body` (array of blocks / Portable Text)

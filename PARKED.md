# The site is parked

`index.html` is a coming-soon page while TargetBooker is in testing.
The real homepage is preserved verbatim as `home.html`, and
`pricing.html`, `features.html`, `info.html` and `terms.html` are
untouched — they're just redirected to the parked page for now.

## To put the real site back

1. Rename `index.html` → `coming-soon.html`
2. Rename `home.html` → `index.html`
3. Delete the `redirects` block from `vercel.json`
4. Remove the `noindex, nofollow` meta tag from the coming-soon page

## Two Vercel gotchas this ran into

- **`rewrites` don't work for this.** Vercel applies them only *after*
  checking the filesystem, so a path with a real file never reaches the
  rewrite. Hence renames + `redirects`, which run first.
- **`vercel.json` allows no comments.** It's validated against a strict
  schema, so a `"//"` key fails the build with an invalid-config error
  rather than being ignored. That's why this note lives in a file.

# Link Repository

A simple, static link repository site for GitHub Pages.

## How to update links

Edit `links.json`. Don't touch the HTML/CSS/JS for normal updates.

- To add a new **section**, add a new object to the `sections` array with a unique `id`, a `title`, and a `links` array.
- To add a new **link**, add an object to a section's `links` array:

```json
{
  "name": "Site Name",
  "url": "https://example.com",
  "description": "One line about it."
}
```

Commit and push — GitHub Pages rebuilds automatically within a minute or two.

## Local preview

Just open `index.html` in a browser, or run a local server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Keeping it out of Google

See the "Privacy" section below / the setup instructions provided separately. Summary:
1. `robots.txt` blocks well-behaved crawlers (already included).
2. A `noindex` meta tag is in `index.html` (already included) — this is the one that actually matters, since Google can still index disallowed pages by URL alone, just without content, unless `noindex` is present.
3. For real privacy, make the GitHub repo **private** and serve Pages from a private repo (requires GitHub Pro, Team, or Enterprise), or just don't share the URL anywhere public/linked.

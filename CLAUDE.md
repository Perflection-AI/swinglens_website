# SwingLens Website

## Deploy to GitHub Pages

**NEVER** create a new git repo inside `dist/` to deploy. It destroys the gh-pages commit history with an unrelated history force push.

**Correct way:**
```bash
npm run build
git add dist && git commit -m "build"
git subtree push --prefix dist origin gh-pages
```

If `subtree push` reports "no new revisions", it means the dist content hash hasn't changed from the last deploy — double-check that the source changes were included in the build output before forcing anything.

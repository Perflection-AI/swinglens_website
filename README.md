<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GVLhXMyu4fyXGyNdYhPcxxljA1g_Es6u

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app 
   `npm run dev`

## Stripe Direct Access Links

The Contact page direct-access section uses one-time Stripe Payment Links. Create one Payment Link per tier in Stripe, enable email collection, then set these build-time env vars. Example values live in `.env.example`.

```bash
VITE_STRIPE_DIRECT_QUICK_QUESTION_URL=
VITE_STRIPE_DIRECT_TEAM_COFFEE_URL=
VITE_STRIPE_DIRECT_STRATEGY_URL=
```

If a link is missing at build time, that tier renders as unavailable instead of falling back to a hardcoded checkout URL.

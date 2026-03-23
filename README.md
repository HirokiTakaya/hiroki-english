# Hiroki English Lessons LP

バンクーバー在住バイリンガル講師による英語プライベートレッスンのランディングページ。

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Resend** (メール送信)
- **Vercel** (デプロイ)

## Setup

```bash
# Install dependencies
npm install

# Create .env.local (copy from example)
cp .env.local.example .env.local

# Edit .env.local with your Resend API key and email
# RESEND_API_KEY=re_xxxxxxxxxxxx
# CONTACT_EMAIL=your-email@example.com

# Run dev server
npm run dev
```

## Resend Setup

1. [resend.com](https://resend.com) にログイン
2. API Keys → Create API Key
3. `.env.local` に `RESEND_API_KEY` をセット
4. **本番用**: Resend でドメイン認証して `from` アドレスを更新
   - `app/api/contact/route.ts` の `from: "onboarding@resend.dev"` を自分のドメインに変更

## Deploy to Vercel

```bash
# Vercel CLI
npx vercel

# Or connect GitHub repo to Vercel dashboard
# Environment Variables を Vercel の Settings で設定:
# - RESEND_API_KEY
# - CONTACT_EMAIL
```

## Project Structure

```
app/
  layout.tsx          # Root layout + metadata + fonts
  page.tsx            # Full LP page
  globals.css         # All styles
  components/
    ContactForm.tsx   # Contact form (client component)
  api/
    contact/
      route.ts        # Resend API route (notification + auto-reply)
```

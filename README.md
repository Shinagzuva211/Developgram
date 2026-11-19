# Developgram

React + Vite asosidagi ijtimoiy tarmoq demo loyihasi. Foydalanuvchi kirishi, yangiliklar
lentasi (YouTube Shorts), kontaktlar, chat, profil, sozlamalar va loyiha fayllarini yuklash
sahifalarini o'z ichiga oladi.

## Ishga tushirish

```bash
npm install
cp .env.example .env
npm run dev
```

`.env` faylida YouTube Data API v3 kalitini kiriting:

```env
VITE_YT_API_KEY=your_youtube_api_key
```

## Skriptlar

- `npm run dev` - development server
- `npm run build` - production build
- `npm run preview` - production build'ni lokal tekshirish
- `npm run lint` - ESLint tekshiruvi

## Muhim eslatmalar

- `VITE_` prefiksli o'zgaruvchilar brauzerga ochiq yuboriladi. YouTube API kalitini
  Google Cloud Console'da HTTP referrer (domen) bo'yicha cheklang.
- `.env` fayli git'ga qo'shilmaydi. Faqat `.env.example` saqlanadi.
- Hozirgi autentifikatsiya localStorage'ga asoslangan demo hisoblanadi; real loyiha uchun
  server tomonidagi autentifikatsiya kerak.

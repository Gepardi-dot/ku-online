# KU-ONLINE Marketplace Frontend

This is a Next.js frontend project for the KU-ONLINE marketplace. It features a modern UI with mock data and is designed to work with any backend service.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data**: Mock data for demonstration

## Supabase storage setup

Image uploads for product listings rely on a Supabase Storage bucket. The frontend defaults to a bucket named `product-images` (or the value of `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`). Create the bucket once in your Supabase project and ensure it is public:

1. Open the [Supabase dashboard](https://supabase.com/dashboard) for your project.
2. Navigate to **Storage → Buckets** and click **New bucket**.
3. Enter `product-images` as the name (or the bucket name you have configured in `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`).
4. Enable **Public bucket** so that listing photos can be displayed without authentication.
5. (Optional) Set a file size limit and allowed MIME types that suit your marketplace.
6. Save the bucket and, if required, add [Storage policies](https://supabase.com/docs/guides/storage#policies) that allow authenticated users to upload objects.

After the bucket exists, image uploads from the sell form will succeed. If uploads still fail, double-check the environment variables in `.env.local` for your Supabase URL, anon key, and storage bucket name.

## Features

- Modern, responsive marketplace UI
- Product browsing and filtering
- Category navigation
- Mobile-friendly design
- Dark/light theme support
- Mock data for demonstration purposes

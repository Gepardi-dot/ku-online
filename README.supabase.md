
# Production Setup: KU-ONLINE with Supabase and Vercel

This guide will walk you through setting up a production-ready KU-ONLINE application using a Supabase backend and deploying it on Vercel.

## Step 1: Set Up Your Supabase Project

If you haven't already, create a new project on [Supabase](https://supabase.com/). Choose a strong password for your database and save it somewhere safe.

### A. Create the `products` Table

Go to the **Table Editor** in your Supabase project dashboard.

1.  Click **"Create a new table"**.
2.  Name the table `products`.
3.  **Leave "Enable Row Level Security (RLS)" CHECKED.** This is critical for production security.
4.  Add the following columns. Make sure the data types match exactly.

| Column Name     | Data Type                 | Default Value            | Is Nullable? | Primary Key |
| --------------- | ------------------------- | ------------------------ | ------------ | ----------- |
| `id`            | `uuid`                    | `gen_random_uuid()`      | No           | Yes         |
| `createdAt`     | `timestamp with time zone`| `now()`                  | No           |             |
| `name`          | `text`                    |                          | No           |             |
| `description`   | `text`                    |                          | No           |             |
| `price`         | `numeric`                 |                          | No           |             |
| `currency`      | `text`                    | `'IQD'`                  | No           |             |
| `category`      | `text`                    |                          | No           |             |
| `condition`     | `text`                    |                          | No           |             |
| `location`      | `text`                    |                          | No           |             |
| `imageUrl`      | `text`                    |                          | No           |             |
| `imageHint`     | `text`                    |                          | Yes          |             |
| `sellerId`      | `uuid`                    |                          | No           |             |
| `seller`        | `jsonb`                   |                          | No           |             |
| `tags`          | `ARRAY` of `text`         |                          | Yes          |             |

5.  Click **Save**.

### B. Create a Storage Bucket for Products

You need a place to store product images.

1.  Go to the **Storage** section in your Supabase project.
2.  Click **"New bucket"**.
3.  Name the bucket `products`.
4.  Check the box to make it a **Public bucket**.
5.  Click **"Create bucket"**.

### C. Enable Google Authentication

Allow users to sign in with their Google accounts.

1.  Go to **Authentication -> Providers**.
2.  Find **Google** in the list and click to expand it.
3.  Follow the instructions provided by Supabase to get your `Client ID` and `Client Secret` from the Google Cloud Console.
4.  Once you have them, paste them into the fields in Supabase and **enable the Google provider**.

### D. Set Up Row Level Security (RLS)

This is the most important security step. It ensures users can only manage their own listings.

1.  Go to **Authentication -> Policies**.
2.  Find your `products` table in the list and click on it.
3.  You will see that "No policies have been defined". We will now add them.

#### Policy 1: Enable `SELECT` (read) access for everyone
Anyone, including logged-out users, should be able to view products.
1.  Click **"New Policy"**.
2.  Select **"From scratch"**.
3.  For **Policy Name**, enter `Allow public read access`.
4.  For **Allowed operation**, check **SELECT**.
5.  For **Target roles**, leave it as `public`.
6.  For **USING expression**, enter `true`.
7.  Click **"Review"** and then **"Save Policy"**.

#### Policy 2: Enable `INSERT` access for authenticated users
Only logged-in users can create new product listings.
1.  Click **"New Policy"**.
2.  Select **"From scratch"**.
3.  For **Policy Name**, enter `Allow insert for authenticated users`.
4.  For **Allowed operation**, check **INSERT**.
5.  For **Target roles**, select `authenticated`.
6.  For **WITH CHECK expression**, enter `auth.uid() = "sellerId"`. This ensures a user can only create a listing where they are the seller.
7.  Click **"Review"** and then **"Save Policy"**.

#### Policy 3: Enable `UPDATE` access for owners
Only the user who created a listing can update it.
1.  Click **"New Policy"**.
2.  Select **"From scratch"**.
3.  For **Policy Name**, enter `Allow update for listing owners`.
4.  For **Allowed operation**, check **UPDATE**.
5.  For **Target roles**, select `authenticated`.
6.  For **USING expression**, enter `auth.uid() = "sellerId"`.
7.  Click **"Review"** and then **"Save Policy"**.

#### Policy 4: Enable `DELETE` access for owners
Only the user who created a listing can delete it.
1.  Click **"New Policy"**.
2.  Select **"From scratch"**.
3.  For **Policy Name**, enter `Allow delete for listing owners`.
4.  For **Allowed operation**, check **DELETE**.
5.  For **Target roles**, select `authenticated`.
6.  For **USING expression**, enter `auth.uid() = "sellerId"`.
7.  Click **"Review"** and then **"Save Policy"**.

Your `products` table is now secure.

## Step 2: Configure Environment Variables for Vercel

When you deploy your project to Vercel, you need to set up environment variables.

1.  In your Supabase project, go to **Project Settings -> API**.
2.  Copy your **Project URL** and your `anon` **public** key.
3.  In your Vercel project dashboard, go to **Settings -> Environment Variables**.
4.  Add the following secrets.

| Key                          | Value                                    |
| ---------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`   | Your Supabase Project URL                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your `anon` public key                   |
| `GEMINI_API_KEY`             | Your Google Gemini API Key (for AI features) |

**Note**: For security reasons, we are not exposing the `SUPABASE_SERVICE_ROLE_KEY`. Our application logic is designed to work securely without it by relying on user-level permissions and RLS.

## Step 3: Deploy to Vercel

1.  Push all the code changes to your GitHub repository.
2.  In Vercel, create a new project and link it to your GitHub repository.
3.  Vercel will automatically detect that it's a Next.js project and deploy it.

That's it! Your project is now configured for production with a secure Supabase backend.

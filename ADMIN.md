# Admin Panel — Access Guide

## 1. Accessing the admin panel

Navigate to `/admin` in your browser while signed in as an admin.

You can also reach it via the navbar: sign in, click your name/avatar in the top-right — if your account has the admin role, an **Admin Panel** link appears at the top of the dropdown.

---

## 2. Promoting a user to admin

Users are `customer` role by default. To make yourself (or anyone) an admin, run the `makeAdmin` script from your project root with your MongoDB URI set:

```bash
MONGODB_URI="your-mongodb-uri-here" npx ts-node --skip-project lib/makeAdmin.ts wilfordmtikwiri@gmail.com
```

Replace the email with the account you want to promote. You only need to do this once.

---

## 3. Admin panel sections

| Section | URL | What you can do |
|---|---|---|
| Dashboard | `/admin` | Revenue, order count, product count, customer count, recent orders |
| Orders | `/admin/orders` | View all orders, change order status (pending → processing → delivered, etc.) |
| Products | `/admin/products` | Add, edit, delete products. Upload product images via Cloudinary. |
| Blog | `/admin/blog` | Write, edit, delete blog posts. Upload cover images. |

---

## 4. Managing blog posts

1. Go to `/admin/blog`.
2. Click **New Post**.
3. Fill in:
   - **Cover Image** — click the upload area to upload a photo (JPG/PNG/WebP, max 5 MB). Stored on Cloudinary.
   - **Title** — the post title. The slug is auto-generated as you type (e.g. "How to Juice" → `how-to-juice`).
   - **Excerpt** — one or two sentences shown on the blog listing page.
   - **Content** — the full post body. Markdown is supported.
   - **Author** — defaults to your account name.
   - **Cover Emoji** — shown as a fallback if no cover image is uploaded.
   - **Tags** — comma-separated (e.g. `nutrition, recipes, tips`).
   - **Publish Date** — defaults to today; change it to schedule or backdate a post.
4. Click **Publish Post**.

To edit a post, click the pencil icon. To delete, click the trash icon (this is permanent).

---

## 5. Managing products

1. Go to `/admin/products`.
2. Click **Add Product**.
3. Upload an image, fill in the details, toggle **In Stock**, then click **Create Product**.
4. Edit or delete existing products with the icons in the table.

---

## 6. Environment variables required

Make sure these are set in `.env.local` before starting the server:

```
MONGODB_URI=
AUTH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
```

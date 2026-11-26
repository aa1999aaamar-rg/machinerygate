# بوابة الآليات المتحدة المحدودة (MGU) — الموقع الرسمي ولوحة التحكم

هذا المستودع يحتوي على الكود المصدري الكامل لموقع **شركة بوابة الآليات المتحدة المحدودة (Machinery Gate United Co. Ltd.)** ولوحة التحكم والإحصائيات الخاصة به، بملكية وتحكم كاملين.

## الرابط المباشر (GitHub Pages)
- الموقع العام: https://aa1999aaamar-rg.github.io/machinerygate/

## هيكل المستودع

- **الجذر (`/`)** — الموقع العام الكامل (HTML / CSS / JS / PWA / SEO):
  - `index.html`, `styles.css`, `app.js`, `i18n.js` — صفحات الموقع والمنطق والترجمة (العربية / الإنجليزية).
  - `img/`, `g/`, `icons/`, `fonts/`, `vendor/` — الصور الميدانية، الشعارات، الأيقونات، خط Cairo، والمكتبات.
  - `mgu-profile.pdf`, `mgu.vcf` — ملف التعريف (البروفايل) وبطاقة التواصل.
  - `manifest.webmanifest`, `sw.js`, `offline.html` — دعم تطبيق الويب التقدمي (PWA) والعمل دون اتصال.
  - `robots.txt`, `sitemap.xml`, `.nojekyll` — إعدادات محركات البحث والنشر على GitHub Pages.
- **`admin-panel/`** — كود لوحة التحكم والإحصائيات وطلبات عروض الأسعار (Cloudflare Worker + KV + D1 + R2):
  - `admin-panel/index.html` — واجهة لوحة التحكم.
  - `admin-panel/_worker.js` — الواجهة البرمجية (API) والإحصائيات وإدارة المحتوى.
- **`README-AR.txt`** — دليل إضافي مبسط بالعربية لخيارات الاستضافة.

## التعديل والنشر

### 1) التعديل المباشر على الموقع (GitHub Pages)
- عدّل أي ملف في الجذر (مثل `index.html` أو `styles.css` أو الصور داخل `img/` و`g/`) واحفظ التغيير (Commit) على فرع `main`.
- سيقوم **GitHub Pages** تلقائياً بتحديث الموقع خلال دقيقة واحدة.
- لربط دومين خاص لاحقاً: من **Settings → Pages → Custom domain** أضف الدومين واضبط سجلات الـ DNS.

### 2) تشغيل لوحة التحكم على حسابك الخاص (Cloudflare)
- أنشئ مشروع Worker أو Cloudflare Pages من مجلد `admin-panel/`.
- اربطه بموارد Cloudflare: `KV (DATA)` و`D1 (DB)` و`R2 (FILES)`.
- حدّث رابط لوحة التحكم (`__CMS_URL`) في ملف `app.js` إلى رابط لوحتك الجديدة.

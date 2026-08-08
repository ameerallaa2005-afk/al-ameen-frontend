/* ============================================================
   server.js — سيرفر بسيط يعرض ملفات الفرونت-إند الثابتة
   (HTML/CSS/JS) على بونتو، لأن Static Site احتاجت package.json
   ============================================================ */
const express = require('express');
const path = require('path');

const app = express();

// يعرض كل الملفات الموجودة بنفس المجلد (index.html, app.js, style.css...)
app.use(express.static(__dirname));

// أي رابط ثاني يرجع لصفحة index.html (مهم لتطبيقات صفحة واحدة SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ al-ameen-frontend شغّال على المنفذ ${PORT}`);
});

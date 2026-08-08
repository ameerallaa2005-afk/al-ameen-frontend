// service-worker.js — يخزن ملفات التطبيق محلياً حتى يشتغل بدون نت
const CACHE_NAME = 'alameen-tawseel-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './data.js',
  './components.js',
  './pages.js',
  './router.js',
  './app.js',
  './manifest.json',
  './assets/logo.png',
  './assets/truck.png',
  './assets/track-boxes.png',
  './assets/app-phone.jpg',
  './assets/hero-bg.jpg',
  './assets/services/local.jpg',
  './assets/services/air.jpg',
  './assets/services/sea.jpg',
  './assets/services/storage.jpg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
];

// عند التثبيت: نخزن الملفات الأساسية
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// عند التفعيل: نحذف أي نسخ كاش قديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// عند كل طلب: نجرب الكاش أول، وإذا موجود بالنت نحدثه بالخلفية (stale-while-revalidate)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

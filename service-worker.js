const cacheName = 'ram-doom-v1';

const contentToCache = [
    '/',
    'index.html',
    'app.js',
    'style.css',
    'icon-16x16.png',
    'icon-192x192.png',
    'icon-512x512.png'
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(contentToCache);
    })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    })());
});
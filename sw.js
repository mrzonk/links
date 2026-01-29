const CACHE_NAME = 'homepage-v1';
const ASSETS_TO_CACHE = [
    './home.html', // Sesuaikan jika nama filenya index.html
    'https://unpkg.com/lucide@latest'
];

// Tahap Install: Menyimpan file ke Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Menyimpan aset ke cache...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Jika ada di cache, kirim dari cache. Jika tidak, ambil dari internet.
            return response || fetch(event.request);
        })
    );
});

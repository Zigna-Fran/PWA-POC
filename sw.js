self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open('offline');
        await cache.addAll(['/css/main.css', '/img/pwa.png', '/js/main.js', '/index.html', '/offline.html', '/favicon.ico','/img/310x310.png']);
    })());
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.log("Fetch failed; returning offline page instead.", error);

                const cache = await caches.open('offline');
                const cachedResponse = await cache.match('/offline.html');
                return cachedResponse;
            }
        })()
    );
});

self.addEventListener('push', (event) => {
    const notification = event.data.json();
    console.log("notification",notification);
    self.registration.showNotification(notification.title, notification)
});
// EdgeFlix Service Worker
// 캐시 버전 및 이름 설정
const CACHE_NAME = 'edgeflix-cache-v1';
const OFFLINE_URL = '/offline.html';

// 캐시할 중요한 리소스들
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  // CSS 및 JS 파일들은 빌드 시 자동으로 추가됨
];

// 외부 API 및 이미지 캐시 설정
const API_CACHE_NAME = 'edgeflix-api-cache-v1';
const IMAGE_CACHE_NAME = 'edgeflix-images-cache-v1';

// 캐시 만료 시간 설정 (1일)
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

/**
 * 서비스 워커 설치 이벤트
 * 기본 리소스들을 캐시에 저장
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Opened cache');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Skip waiting...');
        return self.skipWaiting();
      })
  );
});

/**
 * 서비스 워커 활성화 이벤트
 * 오래된 캐시 정리
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== API_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients...');
        return self.clients.claim();
      })
  );
});

/**
 * Fetch 이벤트 처리
 * 네트워크 요청 가로채기 및 캐시 전략 적용
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // HTML 페이지 요청 처리
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 네트워크가 성공하면 응답 반환
          return response;
        })
        .catch(() => {
          // 오프라인 상태에서 캐시된 페이지 반환
          return caches.match('/') || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // API 요청 처리 (TMDB API, Firebase)
  if (url.origin === 'https://api.themoviedb.org' || 
      url.origin.includes('firebaseapp.com') ||
      url.origin.includes('googleapis.com')) {
    event.respondWith(
      caches.open(API_CACHE_NAME)
        .then((cache) => {
          return fetch(request)
            .then((response) => {
              // 성공적인 응답을 캐시에 저장
              if (response.status === 200) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => {
              // 네트워크 실패 시 캐시에서 반환
              return cache.match(request);
            });
        })
    );
    return;
  }

  // 이미지 요청 처리
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((cached) => {
              if (cached) {
                // 캐시 만료 확인
                const cachedDate = cached.headers.get('cached-date');
                if (cachedDate && 
                    Date.now() - new Date(cachedDate).getTime() < CACHE_EXPIRATION_TIME) {
                  return cached;
                }
              }

              // 네트워크에서 새로운 이미지 가져오기
              return fetch(request)
                .then((response) => {
                  if (response.status === 200) {
                    const responseClone = response.clone();
                    // 캐시 날짜 추가
                    const headers = new Headers(responseClone.headers);
                    headers.set('cached-date', new Date().toISOString());
                    
                    const modifiedResponse = new Response(responseClone.body, {
                      status: responseClone.status,
                      statusText: responseClone.statusText,
                      headers: headers
                    });

                    cache.put(request, modifiedResponse.clone());
                    return response;
                  }
                  return response;
                })
                .catch(() => {
                  // 네트워크 실패 시 캐시된 이미지 반환 또는 플레이스홀더
                  return cached || new Response(
                    '<svg width="300" height="450" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#374151"/><text x="50%" y="50%" text-anchor="middle" fill="#9CA3AF">오프라인</text></svg>',
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                  );
                });
            });
        })
    );
    return;
  }

  // 기타 정적 리소스 처리
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request);
      })
  );
});

/**
 * 백그라운드 동기화 이벤트
 * 네트워크 연결 복구 시 데이터 동기화
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 필요한 동기화 작업 수행
      syncData()
    );
  }
});

/**
 * 푸시 알림 이벤트 (향후 확장 가능)
 */
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('EdgeFlix', options)
    );
  }
});

/**
 * 데이터 동기화 함수
 */
async function syncData() {
  try {
    // 사용자 데이터 동기화 (Firebase)
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_DATA',
        payload: { timestamp: Date.now() }
      });
    });
    
    console.log('[SW] Data synchronized');
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}

/**
 * 캐시 정리 함수
 */
async function cleanupCaches() {
  const cacheNames = await caches.keys();
  const promises = cacheNames.map(async (cacheName) => {
    if (cacheName.includes('images')) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      requests.forEach(async (request) => {
        const response = await cache.match(request);
        const cachedDate = response?.headers.get('cached-date');
        
        if (cachedDate && 
            Date.now() - new Date(cachedDate).getTime() > CACHE_EXPIRATION_TIME) {
          await cache.delete(request);
        }
      });
    }
  });
  
  await Promise.all(promises);
  console.log('[SW] Cache cleanup completed');
}

// 정기적인 캐시 정리 (6시간마다)
setInterval(cleanupCaches, 6 * 60 * 60 * 1000); 
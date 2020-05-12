const cacheName = 'v1'
//Call Install
self.addEventListener( 'install', e => {
    console.log( 'Service Worker Installed' );
} );


//Call Activate
self.addEventListener( 'activate', e => {
    console.log( 'Service Worker Activated' );
    //Remove Existing Cache
    e.waitUntil(
        caches.keys().then( cacheNames => {
                return Promise.all(
                    cacheNames.map( cache => {
                        if ( cache !== cacheName ) {
                            console.log( 'Service Worker Clearing' )
                            return caches.delete( cache )
                        }
                    } )
                )
            } )
    )
} );


//Call Fetch

self.addEventListener( 'fetch', e => {
    console.log( 'Service Workers Fetching' );
    e.respondWith(
        fetch( e.request )
            .then( res => {
            //Make a Clone of response from Server
                const resClone = res.clone();
                //Open Cache
                caches
                    .open( cacheName )
                    .then( cache => {
                        //Add Response to cache
                        cache.put( e.request, resClone )
                    } );
                return res;
        }).catch(err =>caches.match(e.request).then(res=> res))
    )
})


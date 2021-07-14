window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("../sw.js");

        navigator.serviceWorker.ready.then(reg => {
            if('PushManager' in window) {
                registerForPush(reg.pushManager);
            }
        })

        function registerForPush (pushManager) {
            const options = {userVisibleOnly: true, applicationServerKey: new Uint8Array([4, 74, 172, 2, 155, 198, 247, 15, 8, 232, 51, 33, 40, 238, 162, 186, 1, 92, 241, 48, 11, 39, 103, 48, 39, 30, 20, 168, 84, 159, 242, 96, 117, 228, 45, 173, 126, 22, 187, 60, 97, 38, 231, 162, 120, 237, 230, 248, 241, 83, 36, 170, 64, 49, 129, 155, 219, 227, 167, 110, 59, 237, 19, 212, 211])};
            pushManager.subscribe(options)
                .then(subscription => console.log(subscription.toJSON()))
                .catch(error => console.log(error))
        }
    } else {
        console.log(`Navigator does not have serviceWorker`);
    }
});
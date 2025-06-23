// ==UserScript==
// @name         GeoFS-cockpit-volume
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  reduces volume for cc aircraft when in cockpit view
// @author       geofspilot
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// ==/UserScript==

let savedVolume = geofs.preferences.volume;
let wasCockpit = false;

setInterval(() => {
    let cameraMode = geofs.animation.values.cameraMode;

    if (cameraMode == 'cockpit') {
        if (!wasCockpit) {
            savedVolume = geofs.preferences.volume;
            geofs.preferences.volume = savedVolume / 3;
            console.log(`volume set to ${geofs.preferences.volume}`);
            wasCockpit = true;
        }
    } else {
        if (wasCockpit) {
            geofs.preferences.volume = savedVolume;
            console.log(`volume reset to ${savedVolume}`);
            wasCockpit = false;
        }
    }
}, 300);



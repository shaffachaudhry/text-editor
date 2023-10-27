/// Get the element by the ID 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Stores the event in the 'deferredPrompt' property of the window object
    window.deferredPrompt = event;
    // Makes the button visible by removing the hidden class
    butInstall.classList.toggle('hidden', false);
});
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    //Get the stored prompt event from the window object
    const promptEvent = window.deferredPrompt;
    // if the prompt event doesn't exist, return early
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    // Clears the stored prompt event
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('app install')
    window.deferredPrompt = null;
});
const worker = new Worker('./worker.js');  // Load worker script

// Correct way to listen for messages from the worker
worker.onmessage = function(event) {
    console.log('Message from worker:', event.data);
};

// Send a message to the worker
worker.postMessage('Hello from main thread!');

export const clickMe =() => {
        console.log('click button');
}
window.clickMe = clickMe;
self.onmessage = function(event) {
    console.log('Worker received:', event.data);
    let count = 0;
    while(count ++ !==1000000) {
        console.log(count);
    }
    self.postMessage('Hello from worker!');  // Send a response
};

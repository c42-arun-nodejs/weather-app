var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Promise success!');
        reject('Unable to fulfil promise');
    }, 2500);
});

somePromise.then((resolveResult)=> {
    console.log('Success: ', resolveResult);
}, (rejectResult) => {
    console.log('Failed: ', rejectResult);
});
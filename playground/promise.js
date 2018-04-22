var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        if (typeof a === 'number' && typeof b === 'number') {
            resolve(a + b);
        } else {
            reject('Arguments must be a number');
        }
    });
};

// asyncAdd(5, '10').then((resolvedRes) => {
//     console.log(resolvedRes);
//     return asyncAdd(resolvedRes, 100);
// }, (rejectedRes) => {
//     console.log('Error: ', rejectedRes);
// }).then((resolved) => {
//     console.log('Final total: ', resolved)  // <-- this resolve section runs even when previous promise in the chain got rejected - gets an 'undefined' passed in
// }, (rejected) => {
//     console.log('Final error: ', rejected);
// });

asyncAdd(5, '10').then((resolvedRes) => {   // <-- observe we do not supply a 'reject' block for any of the 'then' blocks here1
    console.log(resolvedRes);
    return asyncAdd(resolvedRes, 100);
}).then((resolved) => {
    console.log('Final total: ', resolved)
}).catch((errorMesage) => {
    console.log('Catch block error msg: ', errorMesage);    // <-- catch() block gets called when any of the previous promises get 'reject'ed
});
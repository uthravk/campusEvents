console.log("start");// print 1
setTimeout(()=> console.log("Timer"), 0);// print 4
Promise.resolve().then(()=> console.log("promise"));// print 3
console.log("Finish");// print 2

// promise tasks ( learning code )
function registerStudent(isSuccessful){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(isSuccessful){
                resolve("Registration confirmed");
            }else{
                reject(new Error("Registration failed"));
            }
        },1000);
    });
}
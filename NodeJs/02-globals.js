// GLOBALS -NO WINDOWS !!!

//__diename  - path to current directory
//__filename - file name
//require    - function to use modules(CommonJS)
//module     - info about current module(file)
//process    - info about env where the program is beign executed

console.log(__diename);
setInterval(()=>{
    console.log('hello world!')
},1000)
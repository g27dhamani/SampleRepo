const axios = require("axios");

// const { default: axios } = require("axios");

// const userAction = async () => {
//     try{
//     // const response = await fetch('https://randomuser.me/api/');
//     // console.log(response)
//     // const myJson = await response.json(); //extract JSON from the http response
//     // do something with myJson
//     const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
//     console.log(data);
//     }
//     catch (errMessage){
//         console.log(errMessage);
//     //   console.log(errMessage)
//     }
//   }

// userAction();

//Longest String in array
const longestString = (arr) => {
    let longest=0;
    let word="";
    for(let i=0;i<arr.length;i++){
        if(arr[i].length>longest){
            longest=arr[i].length;
            word=arr[i]
        }      
    }
    return word
}
// console.log(longestString(["seguf","d","nndikw","iwsj","diwndn","fhdjhfidf"]))

//Most commnly used char in String
const mostCommonUsed = (arr) => {
    let mapTest = new Map()
    let charTest=''
    let longest=0

    for(let i=0;i<arr.length;i++){
        if(arr[i]!=" "){
            if(!mapTest.has(arr[i])){
                mapTest.set(arr[i],1)
            }
            else{
                const old = mapTest.get(arr[i])
                mapTest.set(arr[i],old+1)
            }    
        }
        else{
            continue;
        }
    }
    for(let k of mapTest.keys()){
        if(mapTest.get(k)>longest){
            longest = mapTest.get(k)
            charTest = k
        }
    }
    return charTest
}
//console.log(mostCommonUsed("my name is test test"))

//Plaindrome
const plaindrome = (str) =>{
    let start=0,end=str.length-1;
    while(start<=end){
        if(str[start]!=str[end])
            return false
        start++
        end--
    }
    return true;
}
// console.log(plaindrome("mad3dam"))

const armstrong = (number) =>{
    //console.log(number)
    let numberStr = number.toString()
    let len = numberStr.length
    let ans = BigInt(0) 
    for(let ch of numberStr){ //BigInt related issue
        // console.log(ch)
        ans+= BigInt(Math.pow(parseInt(ch),len))
    }
   return number == ans
    // while(number!=0){
    //     ans += Math.pow(number%10,len)
    //     number = parseInt(number/10) 
    // }
    // return ans
}
//console.log(armstrong(234324))

// const getData = async (url) => {
//     try{
//     let urlData = await axios.get(url,{ 
//         headers: { "Accept-Encoding": "gzip,deflate,compress" } 
//     });
//     return urlData
// }
//     catch(errMessage){
//         console.log(errMessage)
//     }
// }
// let getTodo = getData("https://jsonplaceholder.typicode.com/todos")
// console.log(getTodo)


const todo = async () =>{
    try{
        let getTodo = await axios.get("https://jsonplaceholder.typicode.com/todos",{ 
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });
        let dataArr = getTodo.data
        // console.log("All Data")
        let todoCompleted = dataArr.filter( (element) => element.completed );
        // console.log(todoCompleted)

        let todoSortA_Z = todoCompleted.sort((a,b)=>{
            if(a.title>b.title){
                return 1;
            }
            else
                return -1;
        })
        // console.log(todoSortA_Z)

        let todoSortZ_A = todoCompleted.sort((a,b)=>{
            if(a.title>b.title){
                return -1;
            }
            else
                return 1;
        })
        // console.log(todoSortZ_A);
       
        //filter data based on userId
        let userFilterData = []
        // userFilterData = [{userId: 2, todos:[]},{userId: 1, todos:[]}]
        dataArr.map(data => {
            // Use of findIndex 
            let index = userFilterData.findIndex(e => e.userId===data.userId);
            
            if(index === -1){
                userFilterData.push({userId: data.userId, todos:[data]})
            }else{
                userFilterData[index].todos.push(data)
            }
        })
        //console.log(Object.keys(userFilterData))
       // console.log(JSON.stringify(userFilterData))


        let user1_data = userFilterData.find(e => e.userId == 1)
        // let user1_completed = user1_data.todos.filter((e) => {
        //     return (e.completed=true)
        // })

        const updater = (user1_data) =>{
            user1_data.todos.map((element) =>{
                axios.patch(`https://jsonplaceholder.typicode.com/todos/${element.id}`,{completed : true }).then((response)=>{
                    console.log(response.data)
                }).catch((responseError)=>{
                    //console.log(responseError)
                    console.log("Fail")
                })
            })
        
        }
        // updater(user1_data)


        //Delete all User with ID divisible by 3
        // let user_except_3 = userFilterData.filter( (userData) =>{ 
        //     return ( userData.userId % 3 !== 0)
        //     })
        const deleteDivData = (data,number) =>{
            return data.filter((element)=>{
                return element.userId % number !== 0 
            })
        }
        // console.log(deleteDivData(userFilterData,3))
        
        //console.log(userFilterData)
        const deleter = (userFilterData,number) => {
            userFilterData.map((element)=>{
                if(element.userId % number == 0){
                    axios.delete(`https://jsonplaceholder.typicode.com/todos/${element.id}`,
                    ).then((successMessage)=>{
                        console.log(successMessage.data)
                    }).catch((errMessage)=>{
                        console.log(errMessage)
                    })
                }
                
            })
        }
        deleter(userFilterData,2)
        
    }catch(errMessage){
        //console.log("error")
        // console.log("err",errMessage)
    }
}
todo();

//Callback Hell 
// getData(function(a) {
//     getMoreData(a, function(b) {
//       getMoreData(b, function(c) {
//         getMoreData(c, function(d) {
//           getMoreData(d, function(e) {
//             // ...
//           })
//         })
//       })
//     })
//   })
  

const getMoreData1 = (a) =>{
    return new Promise((resolve,reject)=>{
        resolve(a)
    })
}
const getMoreData2 = (b) =>{
    return new Promise((resolve,reject)=>{
        resolve(b)
    })
}
const getMoreData3 = (c) =>{
    return new Promise((resolve,reject)=>{
        resolve(c)
    })
}
const getMoreData4 = (d) =>{
    return new Promise((resolve,reject)=>{
        resolve(d)
    })
}
const getData = async (data) =>{
    try{
        let data1 = await getMoreData1(data)
        console.log(data1)
        let data2 = await getMoreData2(data1+10)
        let data3 = await getMoreData3(data2+50)
        let data4 = await getMoreData4(data3/2)
        return data4
    }
    catch(errMessage){
        console.log(errMessage)
    }
    
}
console.log("Third Git")
// getData(20).then((successMessage)=>{
//     console.log("Test 1",successMessage)
// }).then((successMessage)=>{
//     console.log("Test 2",successMessage)
// }).then((successMessage)=>{
//     console.log("Test 3",successMessage)
// })
// // getData(20).then((successMessage)=>{
//     console.log("Test 1",successMessage)
// }).then((successMessage)=>{
//     console.log("Test 2",successMessage)
// }).then((successMessage)=>{
//     console.log("Test 3",successMessage)
// }).then((successMessage)=>{
//     console.log("Test 4",successMessage)
// }).catch((errMessage)=>{
//     console.log("Test 4 Failed",errMessage)
// }).catch((errMessage)=>{
//     console.log("Test 3 Failed",errMessage)
// }).catch((errMessage)=>{
//     console.log("Test 2 Failed",errMessage)
// }).catch((errMessage)=>{
//     console.log("Test 1 Failed",errMessage)
// })
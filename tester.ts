let sample: number = 1223
console.log(sample)

function signup(name:string ,email: string,exist: boolean = false) {
    console.log(name,email,exist)
}
let user = {name:"faran",place:"del" , email:"tester"}
const obj = (user):{name : string, place: string } => {
    //return {name:"pulkit", place:"Jaipur"}
    return user
}
obj(user)
signup("tester","y@gmail.com",false)

type User ={
    name : string,
    email: string,
    email2?: string, //Optional
    //Function declaration
    funct(): number, 
    funct2 : () => number
    funct3 : (par1: number , par2: string) => number 
}
const fun1 =(user : User) =>{
    return {name:"sampel",email:"email"}
}

const data : string[] | boolean[] =[true, false]
const data2 : string[] | boolean[] =["str", "sun"] 
const data3 : (string | boolean)[] =["str", "sun",false] 

class User2{
    public name: string
    private readonly email : string
    constructor(name: string, email: string){
    
    }
    get getUserName(): string {
        return this.name
    }
    // set setUserName(name: string) : void { // Must not have ANY return type
    // }
}

//Genrics
const sample3 : Array<Number> = [] //Not use much
//Function
function fun34<type> (param: type): type { // can use any letter or word instead of type
    return param
}
const worngfun = (sampleParam : any):any =>{ // Can take number and return string , BAD APPROACH 
    return sampleParam
}
// It will restrict the type form. if string then return string 
const fun23 = <type> (sample: type):type =>{ 
    return sample
}
const funner = <Number> (sample: Number):Number =>{
    return sample
}
//If we want to restrict only to Number or string . Use INTERFACE and pass it as a Generic value
interface someInf{
    param: string|Number
}
const funner2 = <someInf> (param: someInf) : someInf =>{
    return param
}

const arrFun = <T> (param: T[]):T =>{
    return param[2]
}
//Generic using Function
interface Database{ // Sample inf
    fName: string,
    dob: Number
}

const someFun = <T, U extends Database> (param1: T, param2: U): Object =>{ // We can extend type of the Generic (Restrict)
    return {
        exparam: param1, // Can return T thing
        exparam2: "snidn" // Can return any param of Interface Database
    }
}
//Generic Class
class someClass<T>{
    public param: T[]=[]
    param2: T
    someFun : (element : T) =>{
        //defination
    }
}

// Type Predicates
interface Fish{
    swim : () => {}
}
interface Bird{
    fly: () =>{}
}
// Fish - swim, bird - fly 
function isFishCheck( pet: Fish | Bird): pet is Fish { //pet is Fish is doing the actual type conversion 
    return (pet as Fish).swim !== undefined // As is not doing type casting it only use to check wheter "swim" is valid or not. If dont pet.swim!== undefuined gives Error
}


//Discriminated Union
interface Circle{
    kind: "circle",
    radius: number
}
interface Rectangle{
    kind: "rectangle",
    length: number,
    width: number
}
interface Square{
    kind: "square",
    side: number
}

type Shape = Circle | Rectangle | Square

function getArea(shape: Shape) {
    switch(shape.kind){
        case "circle":
            return Math.PI * shape.radius ** 2
        case "rectangle":
            return shape.width * shape.length
        case "square":
            return shape.side ** 2
        default:
            const exp : never = shape // should be used to avoid errors while adding new parameter. Type would be never
            return exp
    }
}
let figure : Shape = {
    kind : "circle",
    radius : 23
}
console.log(getArea(figure))

interface StringArray {
    [index: number]: string; // To add a new parameter with defined shape const str_name = array_num[index as number]
    // [index: string]: number;
  }
   
//   const myArray: StringArray = getStringArray();
//   const secondItem = myArray[1];
  

export{}
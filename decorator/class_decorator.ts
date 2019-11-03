@addName
@seal
class Person {
    constructor(){
       
    }
    name = ''
  sayHi() {
    console.log(`My name is: ${this.name}`)
  }
}

// 創建一個繼承自Person的class
// 直接返回並替換原有的構造函數
function addName(constructor:any) {
  return <typeof Person> class extends constructor {
    name = 'Niko'
  }
}
function seal(constructor:any):void {
    let descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, 'sayHi')
    Object.defineProperty(constructor.prototype, 'sayHi', {
      ...descriptor,
      writable: false
    })
  }
const person1 = new Person().sayHi()
//Person.prototype.sayHi = ()=>{console.log('no')} // 無法修改
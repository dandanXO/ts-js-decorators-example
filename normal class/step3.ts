class Model1 {
    getData() {
      
      return [{
        id: 1,
        name: 'Niko'
      }, {
        id: 2,
        name: 'Bellic'
      }]
    }
  }
  class Model2 {
    getData() {
     
      return [{
        id: 1,
        name: 'Niko'
      }, {
        id: 2,
        name: 'Bellic'
      }]
    }
  }

  function wrap(decorator: { (target: any, key: any, descriptor: any): void; (target: any, key: any, descriptor: any): void; (arg0: any, arg1: string | number | symbol, arg2: PropertyDescriptor): void; }) {
    return function (Model: { prototype: any; }, key: string | number | symbol) {
      let target = Model.prototype
      let descriptor = Object.getOwnPropertyDescriptor(target, key)
  
      decorator(target, key, descriptor)
    }
  }
  
  let log = function (target: any, key: string | number | symbol, descriptor: PropertyDescriptor & ThisType<any>) {
    // 将修改后的函数重新定义到原型链上
   
    Object.defineProperty(target, key, {
      ...descriptor,
      value: function (...arg: any) {
        let start = new Date().valueOf()
        try {
          return descriptor.value.apply(this, arg) // 调用之前的函数
        } finally {
          let end = new Date().valueOf()
          console.log(`start: ${start} end: ${end} consume: ${end - start}`)
        }
      }
    })
  }
  
  let seal = function (target: any, key: string | number | symbol, descriptor: PropertyDescriptor & ThisType<any>) {
    Object.defineProperty(target, key, {
      ...descriptor,
      writable: false
    })
  }
  
// 参数的转换处理
log = wrap(log)
seal = wrap(seal)
//添加耗时统计
log(Model1, 'getData','')
log(Model2, 'getData','')

// 设置属性不可被修改
seal(Model2, 'getData','')
  
  // start: XXX end: XXX consume: XXX
  console.log(new Model1().getData())     // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
  // start: XXX end: XXX consume: XXX
  console.log(Model2.prototype.getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
  //Model2.prototype.getData = ()=>{return [{id:0,name:'ddd'}]} //修改失敗 因為不可修改
  console.log(Model2.prototype.getData())
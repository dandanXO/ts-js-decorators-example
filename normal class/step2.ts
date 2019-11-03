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

function wrap(Model:any, key:any) {
    // 取得Class對應的原型
    let target = Model.prototype
  
    // 獲得函數對應的的PropertyDescriptor
    // 有點像是 java的 refaction https://github.com/JustinSDK/JavaSE6Tutorial/blob/master/docs/CH16.md
    let descriptor = Object.getOwnPropertyDescriptor(target, key)
  
    // 生成新的函數，新增時間統計邏輯
    let log = function (...arg:any[]) {
      let start = new Date().valueOf()
      try {
        return descriptor!.value.apply(target, arg)
      } finally {
        let end = new Date().valueOf()
        console.log(`start: ${start} end: ${end} consume: ${end - start}`)
      }
    }
    
    // 將修改后的函數重新定義到原型鏈上
    Object.defineProperty(target, key, {
      ...descriptor,
      value: log      // 覆盖defineProperty的value
    })
  }
  
  wrap(Model1, 'getData')
  wrap(Model2, 'getData')
  
  // start: XXX end: XXX consume: XXX
  console.log(new Model1().getData())     // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
  // start: XXX end: XXX consume: XXX
  console.log(Model2.prototype.getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
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
  
  console.log(new Model1().getData())     // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
  console.log(Model1.prototype.getData())

  class Model2{
    getData() {
     let start = new Date().valueOf()
     try {
        return [{
          id: 1,
          name: 'Niko'
        }, {
          id: 2,
          name: 'Bellic'
        }]
     } finally {
       let end = new Date().valueOf()
       console.log(`start: ${start} end: ${end} consume: ${end - start}`)
     }
    }
  }

  // start: XXX end: XXX consume: XXX
console.log(new Model2().getData())     // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
// start: XXX end: XXX consume: XXX
console.log(Model2.prototype.getData()) // [ { id: 1, name: 'Niko'}, { id: 2, name: 'Bellic' } ]
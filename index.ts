let a: number = 12;
let b: number = 17;
console.log("The product is: " +  a * b);
export const showProduct = (first: number, second: number): void  => {
    console.log("The product is: " +  first * second);
   
}

module.exports = {showProduct}
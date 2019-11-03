function logger1(config?: { level: any; }) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const _value = descriptor.value;
    if (typeof _value === "function") {
      descriptor.value = (...args: any) => {
        console.log(`logger1-begin : ${config!.level}`);
       _value!.apply(target, args);
        console.log(`logger1-end`);
      
      };
    }
    //return descriptor;
  };
}

function logger2(config?: { level: any; }) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const _value = descriptor.value;
    if (typeof _value === "function") {
      
      descriptor.value = (...args: any) => {
        console.log(`logger2-begin : ${config!.level}`);
        _value!.apply(target, args);
        console.log(`logger2-end`);
      };
    }
   // return descriptor;
  };
}
function whatType() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const _value = descriptor.value;
    console.log(typeof _value);
    console.log(target,descriptor.value+'')
    //return descriptor;
  };
}
interface IShow {
  showMe?(name: string): any;
}

class Show implements IShow {
  @whatType()
  @logger1({ level: "info" })
  @logger2({ level: "error" })
  showMe(name: string) {
    console.log("show me :", name);
    
  }
}

const shoow = new Show();
shoow.showMe("dandan");

//out put

//function
//Show { showMe: [Function] } 'function () {\n                var args = [];\n                for (var _i = 0; _i < arguments.length; _i++) {\n                    args[_i] = arguments[_i];\n                }\n                console.log("logger2-begin : " + config.level);\n                _value.apply(target, args);\n
// logger1-begin : info
//   logger2-begin : error
//     show me : ys
//   logger2-end
// logger1-end
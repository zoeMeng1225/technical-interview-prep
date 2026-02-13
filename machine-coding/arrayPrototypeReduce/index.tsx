// machine-coding/arrayPrototypeReduce/index.tsx
declare global {
    interface Array<T> {
      myReduce<U>(
        callbackFn: (
          previousValue: U,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => U,
        initialValue: U
      ): U;
      myReduce<U>(
        callbackFn: (
          previousValue: T,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => T
      ): T;
    }
  }


Array.prototype.myReduce = function (callbackFn, initialValue){
    const arr = this;
    const len = arr.length;

    let acc: any = initialValue;
    let startIndex = 0;
    
    //check if initialValue is undefined
    if(arguments.length < 2){
        if(len === 0){
            throw new TypeError('Reduce of empty array with no initial value');
        }
        

        acc = arr[0];
        startIndex = 1;
    }

    for(let i = startIndex; i < len; i++){
        if(i in arr){
            acc = callbackFn(acc, arr[i], i, arr)
        }
    }

    return acc;
}

export{}
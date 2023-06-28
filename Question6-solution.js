function findTheMissingNumber(numbers) {
    // Sum of integers from 1 to 100 whose formula is n*(n+1)/2
    const possibleSum = (100 * 101) / 2;  

    // Sum of the array
    const actualSum = arr.reduce((sum, num) => sum + num, 0); 

    // The missing number
    return possibleSum - actualSum; 
  }
  
// let there is an Array with one missing number
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, /* ... */, 99, 100]; 

const missingNumber = findTheMissingNumber(numbers);

console.log('The Missing number is:', missingNumber);
  

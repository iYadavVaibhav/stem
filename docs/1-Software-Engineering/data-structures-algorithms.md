# Data Structures & Algorithms

## DSA Overview

- **Why is DSA important?**
  - In every problem there is a budget, which defines time and money. Hence, it is important to understand the **cost of memory** and **time of execution**.

- **Edge Cases**
  - extreme cases of input or situation
  - like: empty array, bad format

- **Steps to solve a problem using DSA**
  1. state prob clearly
  2. define inputs and outputs and their formats
  3. state test cases and edge cases in english
  4. state correct solution in english
  5. code and test
  6. repeat 2-5
  7. analyze algo's complexity or inefficiency
  8. refactor code, test. repeat 2-8

- **Best Practices in Coding using DSA**
  - create a function
  - give meaningful name and follow standards
  - do test driven development
  - 10 mins code built test repeat, small steps
  - abstract code into functions and make them generic. eg, repetitive logic can be moved to a separate function and used in changing condition function. as in binary-search logic is same but matching condition may vary, so make a generic binary-search function and use it in other functions.
  - problem solving approach and coding both are important, **approach & right technique** is more important that coding
  - don't start coding directly, rather write clearly the problem statement and then solution in **plain english**, then code.
- linear search algorithm or brute force algorithm
  - simple, start from 0 and traverse whole array

- **Time calculation of code execution**
  - `1Ghz` machine can execute `10^9` **instructions** in 1 second (giga = 9). Instructions are low level binary code. so a high level **python statement** can execute tens or thousands of instructions, but thats how you calculate execution time of once statement, and the **set of statements** in function and then number **iterations** of that function in worst case gives its complexity.
  - `iterations --of--> function of statements --having--> statement --build_of--> instructions --processed_on--> CPU`

- **Analyze complexity and find inefficiency**
  - can you **reduce the number of iterations** in the loop? eg, use binary search instead of linear search on a sorted array.
  - complexity of algo is the **max time** it will take to finish, that is total time in **worst case**. it is usually based on the size of array `n`
  - **O(n)** or **Big O Notation** or 'Order of n' means that a code-block is executed `n` number of times at max.
  - **O(log n)** means that code will iterate `log n` times.

## Binary Search Algorithm

- **Binary Search Algorithm**
  - if an array is sorted
  - find the number in middle
  - then look left or right
  - complexity is `log(n)` - that means that in worst case the number of iterations will be `log(n)` for an array of length `n`
  
  - how?
    - lets say we do `k` iterations (at max) to search a number in array of length `n`, i.e. loop will run no more than k times and is hence worst case scenario, so
    - iter: 1, length: n/2
    - iter: 2, length: n/4 = n/2^2
    - iter: 3, length: n/4 = n/2^3
    - ...
    - iter: k, length: n/2^k, this is last iteration and we know in worst case the length will be reduced to 1.
    - `n/2^k = 1` or solve it to get
    - `k = log(n)` which means that the code will have to run maximum `log(n)` number of times.


- Links
  - [Binary Search, Linked Lists and Complexity | Data Structures and Algorithms in Python](https://www.youtube.com/watch?v=clTW4lydwOU&list=PLyMom0n-MBrpakdIZvnhd6PFUCKNAyKo1&index=1) - direct code, no plain algo dry run


## Links

- [DSA Guide - Quora](https://www.quora.com/How-do-I-start-learning-or-strengthen-my-knowledge-of-data-structures-and-algorithms/answer/Robin-Thomas-16)

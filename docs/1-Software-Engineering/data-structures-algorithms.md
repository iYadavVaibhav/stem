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

## CS 61A: Structure and Interpretation of Computer Programs

_prof John DeNero_

CS61A - Fall 2023 - 37 Lectures have playlist on Youtube. Text on [site](https://cs61a.org/).

## CS 61B Data Structures, Fall 2023

- [Prof Josh Hug
](https://www.youtube.com/@joshhug1212/playlists) has lecutre playlist. Other playlists can be found on [course page](https://fa23.datastructur.es/)

## University of California, Berkeley

- **UC Berkeley** (UCB) is "University of California" located in Berkeley, California, USA. It has CS lectures that have open syllabus, course material with lecture slides/videos, assignments, available for free online in an organized manner.
  - Courses have a page and professor. Either videos are on course page, or go to prof youtube channel to find lectures.

- **EECS UCB** is [Electrical Engineering and Computer Science](https://www2.eecs.berkeley.edu/) department.
- [EECS Courses](https://www2.eecs.berkeley.edu/Courses/CS/) cover all CS fundamental and advance cources. Each course has a page where you can see **prerequisites** which will be another course.
  - CS61A/B/C (alternatives CS47ABC)
    - 61A: Teaches you how to think like a programmer
    - 61B: The go-to class that turns a lot of people into great programmers/interested in software.
    - 61C: Everything left in CS that isn't taught in 61A/B: Low-level things. Clocks, CPUs, Assembly, C, etc.
    - skip/skim 61A all together and just watch/do 61B, then 61C stuff
    - Those who have taken these courses claim that after completing this series they feel like they can achieve or learn almost anything if they wanted because they are already well versed on the lingo and tools of CS that is programming, problem solving and low level stuff.
    - DA DSA
    - [CS 61A: Structure and Interpretation of Computer Programs](https://cs61a.org/)
      - Prof [JohnDeNero](https://denero.org/)
        - mostly teaches in Python
        - [youTube](https://www.youtube.com/@JohnDeNero) channel has all lecture assignment videos.
          - go to playlist to see all lectures
    - DataStructur.es
      - info about all CS61 courses
      - [Resources](https://sp23.datastructur.es/resources.html) Algo Visual
  - C9A/B/C/D/E/F/G/H
    - Basic programming courses
    - CS 9C. C for Programmers
    - CS 9D. Scheme and Functional Programming for Programmers
    - CS 9E. Productive Use of the UNIX Environment
  - [CS 186. Introduction to Database Systems](https://www2.eecs.berkeley.edu/Courses/CS186)
    - <https://cs186berkeley.net/>
  - CS 261. Security in Computer Systems
  - [CS 162: Operating Systems and System Programming](https://cs162.org/)


- [Programming Systems (PS)](https://www2.eecs.berkeley.edu/Research/Areas/PS/) - Area in UCB where many discovries were done. It includes following courses
  - CS 61A. The Structure and Interpretation of Computer Programs
  - CS 61B. Data Structures
  - CS 164. Programming Languages and Compilers
  - CS 169. Software Engineering
  - CS 263. Design of Programming Languages
  - CS 264. Implementation of Programming Languages
  - CS 265. Compiler Optimization and Code Generation
  - CS C267. Applications of Parallel Computers

- **Seasons** of the United States
  - Spring - March to May. Q2
  - Summer - June to August. Q3
  - Fall/Autumn - September to November. Q4
  - Winter - December to February. Q1

- **Books** Recommended
  - [A Philosophy of Software Design](https://www.amazon.co.uk/Philosophy-Software-Design-John-Ousterhout/dp/1732102201) by John Ousterhout - recommended by student on reddit

- **Links**
  - [Ask HN: CS61 series from Berkeley, the best set of foundational CS courses?](https://news.ycombinator.com/item?id=34965653)

## Explore Study Material

UCB has best and open material based on reddit and your search.

It will take 2-3 months to complete all lectures. So be patient and just do it without 2nd thought of result. It will benefit you.

## Links

- [DSA Guide - Quora](https://www.quora.com/How-do-I-start-learning-or-strengthen-my-knowledge-of-data-structures-and-algorithms/answer/Robin-Thomas-16)
- DSA <https://www.udacity.com/course/data-structures-and-algorithms-nanodegree--nd256>
- DSA Python <https://www.udemy.com/course/data-structures-and-algorithms-bootcamp-in-python/>
- Coding FAANG <https://www.udemy.com/course/master-the-coding-interview-big-tech-faang-interviews/>

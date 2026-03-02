## Problem 1 – `sum_to_n` implementations

This problem shows **3 different ways** to implement the same function `sum_to_n(n)` in `problem1.js`:

1. **Formula version – `sum_to_n_a`**  
   Uses the arithmetic series formula \(1 + 2 + \dots + n = \frac{n(n+1)}{2}\).  
   This does a **single constant‑time calculation**: `return n * (n + 1) / 2;`.

2. **Loop version – `sum_to_n_b`**  
   Starts from `1`, iterates up to `n`, and keeps a running total in `sum`.  
   This is a **simple iterative approach** that adds each number one by one:
   `for (let i = 1; i <= n; i++) sum += i;`.

3. **Recursive version – `sum_to_n_c`**  
   Defines the sum in terms of smaller subproblems:  
   if \(n \le 0\), return `0`; otherwise return `n + sum_to_n_c(n - 1)`.  
   This is a **recursive approach** where each call adds the current `n` and lets recursion handle the rest.

All three functions compute the same result (`sum_to_n(5) === 15`), but use **different techniques**: a direct math formula, a loop, and recursion.
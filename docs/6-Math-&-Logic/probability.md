# Probability

If an **experiment** is 'rolling 2 dice', then there are 6.6 = 36 outcomes. The possibility of outcome is the probability. (3,4) and (4,3) are two different events.

**Event** is set of outcome of an experiment.

**Probability** is a way to find likeliness of an event to happen. Permutation and combination are ways to count events and possibilities. Probability tells us:

- how likely event is going to happen.
- possibility of event that is fundamentally random.
- Quantifying the uncertainity.

For example, if we flip a coin we can get either heads or tails. The possibility of heads is 50% and possibility ability of tails is 50%. So the probability of Heads is .5 and probability of tails is also .5, if it is a biased coin.

$$ P(e) = \frac{ Possibilities }{ Outcomes } $$

**Theoretical or Classical Probability**

- It can be stated and seems fixed.
- For example flipping a coin.

**Experimental or Subjective Probability**

- Finding an outcome based on past data and experience
- example prediction of the score. Probability gives a reasonable predictions about an outcome. It is highly likely but not hundred percent true.

**Simulation and Randomness**

- We can use list of random numbers to simulate our experiment multiple times and average out to find confidence.

**Sample Space** is collection of all possible outcomes of a random experiment. Hence, event can be any subset of sample space.

**Variable** is anything whose value changes.

**Discrete variable** is a variable whose value is calculated by counting. Eg, number of students in class, number of blue marbles in a jar, number of tails when flipping four coins.

**Continuous variable** is a variable whose value is calculated by measuring. Eg, height of players in team, weight of students in class, time it takes to get to work

**Random variable** is a variable whose possible values are outcomes of a random experiment. It is denoted usually X. P(X) is probability distribution of X, it tells values of X and its probability. Random variable can be continuous or discrete.

**Discrete random variable** X has a countable number of possible values. Its probabilty distribution is histogram.

**Continuous random variable** X takes all values in a given interval of numbers. The probability distribution of a continuous random variable is shown by a **density curve**. The probability that X is between an interval of numbers is the **area under the density curve** between the interval endpoints. The probability that a continuous random variable X is exactly equal to a number is zero.

## Events and its Types

Every possible outcome of a variable is an event.

**Simple event**

- described by a single characteristic.
- For eg, a day in January from all days in 2018.
- Complement of an event A (denoted A’).
  - All events that are not part of event A.
  - For eg, all days from 2018 that are not in January.

**Joint event**

- described by two or more characteristics.
- For eg, a day in January that is also a Wednesday from all days in 2018.

**Mutually Exclusive or Disjoint Sets**

- cannot occur simultaneously.
- They have no intersection outcomes.
- For eg, A = day in Jan, B = day in Feb. A and B cannot occur simultaneously.
  - In this, P(A1 U A2 U A3...) = P(A1) + P(A2) + P(A3)...
  - Also, P(A & B) = 0.

**Collectively Exhaustive Events**

- One of the event must occur
- The set of events covers the entire sample space
- For eg, A = Weekday; B = Weekend; C = January; D = Spring;
  - Events A, B, C and D are collectively exhaustive (but not mutually exclusive – a weekday can be in January or in Spring).
  - Events A and B are collectively exhaustive and also mutually exclusive.

**Independent Events**

- not dependent on each other. That is, occurrence of one does not affect occurrence of another event.

**Note:** All mutually exclusive events are dependent but not all dependent events are mutually exclusive.

## Addition Rule

Addition rule of probability.

$$ P(A \cup B ) = P(A) + P(B) -P(A \cap B) $$

if mutually exclusive, then $P(A \cap B) = 0$.

And is intersection, or is union.

For eg, P(Jan or Wed) = P(Jan) + P(Wed) - P(Jan and Wed) = 31/365 + 52/365 - 5/365 = 78/365

## Multiplication Rule

For independent event, what happened in past event will have no effect on current event. For eg, P(HH) or P(at least 1H in 10 flips).

$$ P(HH) = 0.5 \times 0.5 $$

P(at least 1H in 10 flips) = 1 - P(All T in 10 flips)

$$ 1 - (0.5)^{10} = 1023 \div 1024 = 99.9% $$

---

## Marginal or Unconditional Probability

- Simple probability like P(A) = 0.2, P(B) = 0.4

## Joint Probability

- P(A & B) both events to happen simultanieously

## Conditional Probability

When we have to find a probability under a **give**n condition.

**Dependent Events**

- A\|B is 'A happening after B' or 'conditional prob of A given that B has occurred'.
- B becomes the **new sample space**, because it's A **given B**. Hence,

$$ P(A|B) = \frac{P(A \& B)}{P(B)} $$

**Independent Events**

- if independent (does not affect each other), then

$$ P(A|B) = P(A) $$

**Important outcome**:

- When finding  **P(A & B)** we have to consider and analyse that whether A and B are dependent or not.
- Based on dependency, our P(A & B) changes as follows:

If dependent, the probability of A and B is:

$$ P(A \& B) = P(A) \times P(B|A) = P(B) \times P(A|B) $$

else

$$ P(A \& B) = P(A) \times P(B) $$

because P(B\|A) = P(B), occurrence of A has no effect on B.


**Probability of A or B**

$$ P(A \space or \space B) = P(A) + P(B) - P (A \& B) $$

---


Add all the joint probability of colectively exhaustive and mutually exclusive events to get marginal probability of one event.

eg, Consider industries and performance below.

 | Poor |Avg|Good|Marginal
 ---|
 small|0.02|0.07|0.01|0.1
 medium|0.12|0.3|0.18|0.6
 large|0.06|0.13|0.11|0.3
Marginal|0.2|0.5|0.3|1

## Counting Events

### Permutation

Arrange $n$ people in $k$ seats. To count number of ways in which this can be done we use permutation.

For eg, arrange 6 people in 3 seats, 6.5.4 = 6! / 3! = 120.

$$ _nP_k = \frac{n!}{(n - k)!} = n(n-1)... (k  times) $$

Used when order matters and pick once (without replacement).

For eg,

$$ _{10}P_3 = 10.9.8 $$

### Combinations

$$ _nC_k = \binom{n}{k} = \frac{_nP_k}{k!} = \frac{n!}{k!(n - k)!} = \frac{n(n-1)...[k \space times]}{k!} $$

We divide it by the number of ways in which k people can be arranged in k places, i.e, k! because ABCD and BCDA are same and we are counting this extra.

Order doesn't matter, 123 = 312.

For eg,

$$ _{10}C_3 = \frac{10.9.8}{3.2.1} $$

## Approach to solve a problem

We can take following approaches to solve a probability problem

1. use simple definition,
    $$ P(e) = \frac{events \space possible}{sample \space space} $$

1. Make a **Contingency Table** with possibilities.
   1. To find P(A or B), use P(A)+ P(B) - P(A and B)
   2. To find P(A and B), simply use (joint event)/total.
   3. To find P(A|B), P(A and B) / P(B)


2. Make a **Decision Tree**, use when question has "after".
   1. Find branches and outcomes
   2. Find effective value by multiplying with probabilities
   3. Roll back to find effective value at each branch.

3. Use **Venn Diagram** when and/or is combined with not of a event.

4. At least or at most, use

$$ P(at least/most) = 1 - P(e) $$

**Example**

Find number of ways to arrange 1 - 10 digits in 3 places,

Repetition allowed, order matters = 10.10.10

Repetition not allowed, order matters = Permutation = 10.9.8

Repetition allowed, order doesn't matter =

$$ \frac{10.10.10}{3.2.1} $$

Repetition not allowed, order doesn't matter = Combination =

$$ \frac{10.9.8}{3.2.1} $$

---

References:

- [Khan Academy](https://www.khanacademy.org/math/statistics-probability).
- [AMPBA - ISB](https://www.isb.edu/advanced-management-programme-in-business-analytics)


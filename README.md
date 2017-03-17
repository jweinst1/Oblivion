# Oblivion


The language of art and graphics!

Oblivion is a programming language that produces SVG files. It's a domain specific language dedicated to producing graphics and
giving programmers as well as artists the tools to create art with code.

 It's a language designed to visualize code and create incredible illustrations!

#### `Features:`
* SVG-specific data structures and operators
* Simple, Ruby/Python like syntax
* Runs in the browser, or in NodeJS
* Recursion and functional programming support
* Immutable Python-style lists

`Oblivion` is the perfect programming language for artists, researchers, programmers, and anyone who wants to use a functional approach to visualize their code.

Try out Oblivion on the playground, or read the guide to see how it all works!

## `Language Guide`:

## Output

Oblivion is a programming language that outputs a string representing an svg format graphic. This is called the `SVGOut`. We can think of this output as a buffer. Similarly, the language can aslo "print" statements to another output called `StdOut`. Both of these are accessed with the `draw` keyword and `print()` function respectively.

### WhiteSpace

In Oblivon, newlines, spaces, tabs and commas are treated as whitespace. This means you can put as many commas, spaces or newlines as you like, to allow for a customized spacing of code.

```

print(3, 4)
print(3,,,,,,,,,
,,,,,,,,,,,,4)

3
4
3
```

## Types

Oblivion has a relatively small number of types, allowing for a small variety of data to yield many combinations of uses and functionality.

### Numbers

Numbers in Oblivion represent both Integers and Floats. They are very similar to JavaScript numbers.

```
print(7 /6)
print(4 + 6)

1.1666666666666667
10
```

### Bools

Bools or booleans represent true and false in Oblivion. They are the results of using logical operators.

### Lists

Lists are a special type in Oblivion and are denoted with square brackets `[]`. They can contain any value, and are not statically typed. They are also immutable, you can only use operators to create new lists, you can never edit a list once it's created.

```
print([1,2,3])
print([1 2 3])
g = [1] & [2, 3]
print(g)
print(g & [2, 3 + 3])

[1,2,3]
[1,2,3]
[1,2,3]
[1,2,3,2,6]
```

### Points

Points are two member structs that contain two numbers, one that applies to the x and y coordinate of a point on a grid. SVG graphics are always arranged on a x-y grid system, thus points are an easy way to manage places on a grid.

You can access the x and y properties of a point, but points are always immutable

```
f = (3, 2)
print(f.x)

3
```

### Lines

In Oblivion, a line is a data structure that represent a series of points connected by a line. It is immutable, like the rest of Oblivon's types. A line has both a printable form and a drawable form. They are connected via the `->` operator.

```
g = (1,8) -> (44, 9) -> (44,44)
 print(g)
g = #red |= g
draw g

1,8 -> 44,9 -> 44,44
```

This gives the SVG

```xml
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
<style></style>
<polyline points="1,8 44,9 44,44" fill="transparent" stroke="red" stroke-width="1"></polyline>
</svg>
```


### Shapes

Shapes, also called polygons, are very similar to lines, but they are always `filled`. This means that the shape is always colored. Shapes are connected via the `*>` operator.

```
g = (1,8) *> (44, 9) *> (44,44) *> (0, 90)
 print(g)
g = #tan |= g
draw g

1,8 *> 44,9 *> 44,44 *> 0,90
```

```xml
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
<style></style>
<polygon points="1,8 44,9 44,44 0,90" fill="tan" stroke="transparent" stroke-width="1"></polygon>
</svg>
```

### Colors

Colors are special types in Oblivion that allow you to color your lines and shapes. For now, you can use a small range of named colors, like `red` or `orange`, or a hex color, such as `#fff`.

## Operators

Unlike most functional languages, Oblivion uses a wide array of operators (*and a minimal amount of parenthsis*).

### Left Associativity

It is important to note all operators in Oblivion associate toward the left. There is no other operator precedence.

### Arithmetic Operators

Oblivion has five arithmetic operators, `+, -, *, /, %`. They are used like so:

```
print(3 + 3)
print(44 / 5 - 4)
print(6 % 2)

6
44
0
```

#### Random Number Operator

The `!!` operator returns a random number between the left and right numbers argued with it respectively. Such as `3 !! 10`.

### Logical Operators

Oblivion makes use of several different logical operators. These can be used to compare values, and check if values are the same.

```
print(3 == 4)
print([4] ~= [4])
print(true == 3 == 3)
print(3 != 4)
print(5 <= 5 + 7 - 3 * 4)

false
true
true
true
```

The `~=` checks for absolute equality, and can compare lists against each other. The `==` operator will not work properly for lists.

### List Operators

Oblivion has two operators specifically for lists! The first is the extension operator, `&`. It returns a new list that is extended by the right hand list or other element. If the right side is not a list, it acts as an appending operator.

Second is the set, `=>` operator. It allows you to reference an index of a list and returns a new copy of the list that gets reassigned.

```
a = [1, 2, 3]
print(a & [4])
print(a.1 => [3])

[1,2,3,4]
[1,[3],3,4]
```

### Color Operator

The `|=` operator takes one color and a line shape or combo and colors it.

## If-Else Statements

Oblivions only conditional element is the if statement. It's constructed similarly to Ruby's if..else syntax. Like with all body statements, if statements end with a _, and can be nested.

```
d = (3,4) -> (5,6)
e = (3,4) -> (5,6)
if d ~= e
    print(true)
else
   print(false)
_

true
```

They can also be used with the `draw` keyword

```
g = (88, 1) *> (5, 5)

if 3 == 3
   draw (30, 30) *> g
_

if 3 == 4
   draw (30, 30) *> g
else
    draw #green |= (60, 30) *> g
_
```

```xml
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
<style></style>
<polygon points="30,30 88,1 5,5" fill="black" stroke="transparent" stroke-width="1"></polygon>
<polygon points="60,30 88,1 5,5" fill="green" stroke="transparent" stroke-width="1"></polygon>
</svg>

```

## Functions

Functions are the central feature in Oblivion used for computation. They work much like functions in languages like Ruby and Python. They even use the all so familiar `def` keyword!

```
def fact(i)
   if i == 0
      return i
   else
      return i + fact(i - 1)
   _
_

print(fact(8))

36
```

Functions can also be used with drawing!

```
def diagonal(n)
     if n == 0
         return (0, 0)
     else
        return (n, n) -> diagonal(n - 1)
    _
_

draw diagonal(99)
```

```

<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
<style></style>
<polyline points="99,99 98,98 97,97 96,96 95,95 94,94 93,93 92,92 91,91 90,90 89,89 88,88 87,87 86,86 85,85 84,84 83,83 82,82 81,81 80,80 79,79 78,78 77,77 76,76 75,75 74,74 73,73 72,72 71,71 70,70 69,69 68,68 67,67 66,66 65,65 64,64 63,63 62,62 61,61 60,60 59,59 58,58 57,57 56,56 55,55 54,54 53,53 52,52 51,51 50,50 49,49 48,48 47,47 46,46 45,45 44,44 43,43 42,42 41,41 40,40 39,39 38,38 37,37 36,36 35,35 34,34 33,33 32,32 31,31 30,30 29,29 28,28 27,27 26,26 25,25 24,24 23,23 22,22 21,21 20,20 19,19 18,18 17,17 16,16 15,15 14,14 13,13 12,12 11,11 10,10 9,9 8,8 7,7 6,6 5,5 4,4 3,3 2,2 1,1 0,0" fill="transparent" stroke="black" stroke-width="1"></polyline>
</svg>
```

Because Oblivion uses trampoline recursion, the limit for a recursive call is much deeper than with most other languages.

## Processes

A Process in oblivion is a no parameter function denoted by `{}`. It's meant to serve as a currying tool to aid in functional programming. It's also very useful for drawing.

```
f = [1]
f = f.0 => {return [2]}
print(f.0())

[2]
```

You can also use processes with the `repeat` built-in function

```
f = [1]
f = f.0 => {print(3)}
repeat(4, f.0)

3
3
3
3
```

## List Functions

Oblivion also has a variety of built in List functions that can slice, search, and insert items into a newly returned list.

```
print(range(8))
print(insert(range(7), 3, 88))
print(find(range(5), 77))
print(len(range(8)))

print(slice([1, 2, 3, 4], 2))

[0,1,2,3,4,5,6,7]
[0,1,2,88,3,4,5,6]
false
[3,4]
8
```

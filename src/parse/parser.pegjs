Program
  = Statement*
  
/*All possble program expressions*/  
Statement 
  = Def
  
Def
  = _? "@" _ n:Name _? "=" _? w:Value _? {
      return {node:"def", name:n.join(""), value:w};
  }
  
Value
  = Add / Word
  
Add
  = a:Word _? "+" _? b:Word {return {op:"+", first:a, second:b};}

_ "whitespace"
  = [ \t\n\r]*
  
Word "word"
  = w:[0-9a-zA-Z]+ {return w.join("");}
  
Name "name"
  = [a-zA-Z-]+

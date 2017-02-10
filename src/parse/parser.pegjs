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
  = Word

_ "whitespace"
  = [ \t\n\r]*
  
Word "word"
  = [0-9a-zA-Z]+
  
Name "name"
  = [a-zA-Z-]+

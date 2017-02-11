Program
  = c:Statement* _? {return {node:"program", args:c};}
  
Statement
  /*Statements are the core top rule*/
  =   _? a:Assign {return a;} 
  / _? c:Call {return c;}
  
Call
  /*Can Parse Function Calls*/
  = node:Name "(" _ args:Operands _ ")" {
     return {node:node, args:args};
  }
  
Assign
  =  _? v:Name _? "=" _? val:Argument {return {node:"=", args:[v, val]};}
  
List
  = "[" _ args:Operands _ "]" {
    return {node:"list", args:args};
  }
  
Operands
  = Argument*
  
Argument
  = _? c:Call {return c;}
  / _? l:List {return l;}
  / _? s:String {return s;}
  / _? a:Word {return a;}

_ "whitespace"
  = [ \t\n\r,]*
  
Name
  = n:[a-zA-Z_-]+ {return n.join("");}

Word
  =  w:[a-z0-9A-Z-_$]+ {return {node:"word", args:[w.join("")]};}
  / n:[0-9]+ {return {node:"number", args:[n.join("")]};}
  
String
  = '"' s:[^"]* '"' {return {node:"string", args:[s.join("")]};}
  
Operator
  = "=" / "<<"

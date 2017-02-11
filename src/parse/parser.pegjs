Program
  = c:Statement* {return {node:"program", args:c};}
  
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
  / _? a:Word {return a;}

_ "whitespace"
  = [ \t\n\r,]*
  
Name
  = n:[a-zA-Z_-]+ {return n.join("");}

Word
  = w:[0-9a-zA-Z-_$]+ {return w.join("");}

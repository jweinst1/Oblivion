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
  
Function
  = "{" _? "(" _ params:Params _ ")" _ body:Body _ "}" {
     return {node:"func", args:[params, body]};
  }
  
Operands
  = Argument*
  
Params
  = p:Name* {return {node:"params", args:p};}
  
Body
  = s:Statement* {return {node:"body", args:s};}
  
Argument
  = _? c:Call {return c;}
  / _? f:Function {return f;}
  / _? l:List {return l;}
  / _? s:String {return s;}
  / _? a:Word {return a;}

_ "whitespace"
  = [ \t\n\r,]*
  
Name
  = _? n:[a-zA-Z_-]+ {return n.join("");}

Word
  =  w:[a-z0-9A-Z-_$]+ {
      var result = w.join("");
      if(isNaN(result)) return {node:"word", args:[result]};
      else return {node:"number", args:[result]};
  }
  
String
  = '"' s:[^"]* '"' {return {node:"string", args:[s.join("")]};}
  
Operator
  = "=" / "<<"

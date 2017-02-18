Program
  = c:Statement* _? {return {node:"/program", args:c};}

Statement
  /*Statements are the core top rule*/
  =   _? a:Assign {return a;}
  / _? a:Append {return a;}
  / _? d:Draw {return d;}
  / _? c:Call {return c;}

Call
  /*Can Parse Function Calls*/
  = node:Name "(" _ args:Operands _ ")" {
     return {node:node, args:args};
  }

Assign
  =  _? v:Name _? "=" _? val:Argument {return {node:"=", args:[v, val]};}

Draw
  =  "draw:" _ val:Argument {return {node:"/draw", args:[val]};}

Append
  =  _? v:Name _? "<<" _? val:Argument {return {node:"<<", args:[v, val]};}

List
  = "[" _ args:Operands _ "]" {
    return {node:"/list", args:args};
  }

Atrribute
  = obj:Name "." attr:Word {return {node:".", args:[obj, attr]};}

Function
  = "{" _? "(" _ params:Params _ ")" _ body:Body _ "}" {
     return {node:"/func", args:[params, body]};
  }

Operands
  = Argument*

Params
  = p:Name* {return {node:"/params", args:p};}

Body
  = s:Statement* {return {node:"/body", args:s};}

Argument
  = _? c:Call {return c;}
  / _? f:Function {return f;}
  / _? l:List {return l;}
  / _? s:String {return s;}
  / _? a:Atrribute {return a;}
  / _? a:Word {return a;}

_ "whitespace"
  = [ \t\n\r,]*

Name
  = _? n:[a-zA-Z_@$-]+ {return {node:"/name", args:[n.join("")]};}

Word
  =  w:[a-z0-9A-Z-_$@]+ {
      var result = w.join("");
      var imdict = {'true':['/bool', true], 'false':['/bool', false], 'null':['/null', null]};
      if(result in imdict) {return {node:imdict[result][0], args:[imdict[result][1]]}}
      else if(isNaN(result)) {return {node:"/word", args:[result]};}
      else return {node:"/number", args:[result]};
  }

String
  = '"' s:[^"]* '"' {return {node:"/string", args:[s.join("")]};}

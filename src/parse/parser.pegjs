Program
  = c:Statement* _? {return {node:"?program", args:c};}

Statement
  /*Statements are the core top rule*/
  =   _? a:Assign {return a;}
  / _? d:Def {return d;}
  / _? i:If {return i;}
  / _? f:For {return f;}
  / _? l:Loop {return l;}
  / _? d:Draw {return d;}
  / _? c:Call {return c;}

Call
  /*Can Parse Function Calls*/
  = node:[a-zA-Z!><=/+%*_@$-]+ "(" _ args:Operands _ ")" {
     return {node:node.join(""), args:args};
  }
  / method:Attribute "(" _ args:Operands _ ")" {
     return {node:"?method", args:[method].concat(args)};
  }

Def
  = "def" _ n:Name _ "(" _ params:Params _ ")" _ b:Body _ "_" {
     return {node:"?def", args:[n, params, b]};
  }

Gen
  = "gen" _ n:Name _ b:Body _ "call" _ c:Body "_" {
     return {node:"?gen", args:[n, b, c]};
  }

If
  = "if" _ c:Argument _ b:Body _ "_" {
    return {node:"?if", args:[c, b]};
  }

For
  = "for" _ v:Name _ "in" _ a:Argument _ b:Body _ "_" {
     return {node:"?for", args:[v, a, b]};
  }

Loop
  = "loop" _ c:Argument _ b:Body _ "_" {
     return {node:"?loop", args:[c, b]};
  }

Assign
  =  _? v:Name _? "=" _? val:Argument {return {node:"?=", args:[v, val]};}
  / _? v:Attribute _? "=" _? val:Argument {return {node:"?=>", args:[v, val]};}

Draw
  =  "draw:" _ val:Argument {return {node:"?draw", args:[val]};}

List
  = "[" _ args:Operands _ "]" {
    return {node:"?list", args:args};
  }
  / "[" _ args:Pair* _ "]" {
    return {node:"?map", args:args};
  }
  / "[:]" {return {node:"?map", args:[]};}
  / "[" _ a:Name _ ";" _? b:Argument* _? "]" {
    return {node:"?lcomp", args:[a].concat(b)};
  }

Pair
  = _ arg1:Word ":" arg2:Argument _ {
    return {node:"?pair", args:[arg1, arg2]};
  }

Attribute
  = obj:Name "." attr:Word {return {node:"?.", args:[obj, attr]};}

Generator
  = "|" _ defs:Body _ ";" _ proc:Body _ "|" {
      return {node:"?gen", args:[defs, proc]};
  }

Function
  = "{" _? "(" _ params:Params _ ")" _ body:Body _ "}" {
     return {node:"?func", args:[params, body]};
  }

Operands
  = Argument*

Params
  = p:Name* {return {node:"?params", args:p};}

Body
  = s:Statement* {return {node:"?body", args:s};}

Process
  = "~{" _ proc:Body _ "}" {return {node:"?process", args:[proc]}}


Argument
  = _? c:Call {return c;}
  / _? f:Function {return f;}
  / _? g:Generator {return g;}
  / _? p:Process {return p;}
  / _? l:List {return l;}
  / _? s:String {return s;}
  / _? a:Attribute {return a;}
  / _? a:Word {return a;}

_ "whitespace"
  = [ \t\n\r,]*

Name
  = _? n:[a-zA-Z_@$-]+ {return {node:"?name", args:[n.join("")]};}


Word
  =  w:[a-z0-9A-Z-_$@]+ {
      var result = w.join("");
      var imdict = {'true':['?bool', true], 'false':['?bool', false], 'null':['?null', null]};
      if(result in imdict) {return {node:imdict[result][0], args:[imdict[result][1]]}}
      else if(isNaN(result)) {return {node:"?word", args:[result]};}
      else return {node:"?number", args:[result]};
  }

String
  = '"' s:[^"]* '"' {return {node:"?string", args:[s.join("")]};}

import {Environment} from "./Env";
/**
 * Created by Josh on 2/15/17.
 * File that handles the main generator function
 */

export namespace Gen {
    //main processing function that generates SVG and processes statements
    export let gen = (AST:Object):void => {
        let env = new Environment.Env();
        if(AST["node"] === '/program') {
            for(let i=0;i<AST['args'].length;i++){
                let result = env.callLib(env, AST['args'][i].node, AST['args'][i].args);
                console.log(result(env, [{node:'/number', args:['3']}]));
            }
        }
    }
}


let tree = {
    node:"/program",
    args:[
        {
            node:"/func",
            args:[
                {
                    node:"/params",
                    args:[
                        {
                            node:"/name",
                            args:[
                                "foo"
                            ]
                        }
                    ]
                },
                {
                    node:"/body",
                    args:[
                        {
                            node:'return',
                            args:[
                                {
                                    node:"/number",
                                    args:[
                                        '6'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

Gen.gen(tree);
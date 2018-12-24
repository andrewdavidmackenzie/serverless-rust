import * as wasm from "serverless-rust";

//wasm.greet();
let phraseText = wasm.get_phrase_text(100, 10);
console.log(phraseText);
alert(phraseText);

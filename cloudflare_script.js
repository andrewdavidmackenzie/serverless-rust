const mod = (() => {
  let wasm;

  let cachedTextDecoder = new TextDecoder('utf-8');

  let cachegetUint8Memory = null;
  function getUint8Memory() {
      if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
          cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
      }
      return cachegetUint8Memory;
  }

  function getStringFromWasm(ptr, len) {
      return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
  }

  /**
  * @returns {void}
  */
  function greet() {
      return wasm.greet();
  }
    
  let cachedGlobalArgumentPtr = null;
  function globalArgumentPtr() {
      if (cachedGlobalArgumentPtr === null) {
          cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
      }
      return cachedGlobalArgumentPtr;
  }

  let cachegetUint32Memory = null;
  function getUint32Memory() {
      if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
          cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
      }
      return cachegetUint32Memory;
  }

  /**
  * @param {number} arg0
  * @param {number} arg1
  * @returns {string}
  */
  function get_phrase_text(arg0, arg1) {
      const retptr = globalArgumentPtr();
      wasm.get_phrase_text(retptr, arg0, arg1);
      const mem = getUint32Memory();
      const rustptr = mem[retptr / 4];
      const rustlen = mem[retptr / 4 + 1];

      const realRet = getStringFromWasm(rustptr, rustlen).slice();
      wasm.__wbindgen_free(rustptr, rustlen * 1);
      return realRet;

  }

  function __wbg_alert_a6f756c1262c4809(arg0, arg1) {
      let varg0 = getStringFromWasm(arg0, arg1);
      alert(varg0);
  }

  function __wbg_now_7e59c3475b182c97() {
      return Date.now();
  }

  function __wbindgen_throw(ptr, len) {
      throw new Error(getStringFromWasm(ptr, len));
  }

  const importObject = {
    './serverless_rust': {
        __wbg_alert_a6f756c1262c4809,
        __wbg_now_7e59c3475b182c97,
        __wbindgen_throw
    }
  };

  const inst = new WebAssembly.Instance(SERVERLESS_RUST, importObject);
  wasm = inst.exports;

  return {
    greet,
    get_phrase_text,
  };

})();

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
* Fetch and log a request
* @param {Request} request
*/
async function handleRequest(request) {
  console.log('Got request', request)

  let phrases = mod.get_phrase_text(100, 10);

  const response = new Response(phrases, {status: 200});
  return response
}

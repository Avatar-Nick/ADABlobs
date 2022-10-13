class Loader {
    _wasm: any;

    async load() {
      if (this._wasm) return;
      
      this._wasm = await import(
        //"@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib",
        //"@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib",
        "@dcspark/cardano-multiplatform-lib-browser"
      );
    }
  
    get Cardano() {
      return this._wasm;
    }
}
  
export default new Loader();
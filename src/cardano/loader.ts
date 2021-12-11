class Loader {
    _wasm: any;

    async load() {
      if (this._wasm) return;
      
      this._wasm = await import(
        //"@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib" // This doesn't work, Spacebudz created a customer version that does
        "./custom_modules/@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib"
      );
    }
  
    get Cardano() {
      return this._wasm;
    }
  }
  
export default new Loader();
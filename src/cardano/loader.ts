class Loader {
    _wasm: any;
    _wasm2: any

    async load() {
      if (this._wasm) return;
      
      this._wasm = await import(
        "./custom_modules/@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib"
        // "@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib",
      );
    }
  
    get Cardano() {
      return this._wasm;
    }
}
  
export default new Loader();
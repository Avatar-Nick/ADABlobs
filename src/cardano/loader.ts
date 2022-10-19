class Loader {
    _wasm: any;

    async load() {
      if (this._wasm) return;
      
      this._wasm = await import(
        "./custom_modules/@dcspark/cardano-multiplatform-lib-browser/cardano_multiplatform_lib"
      );
    }
  
    get Cardano() {
      return this._wasm;
    }
}
  
export default new Loader();
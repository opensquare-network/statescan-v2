class ChainProperties {
  #ss58Format;

  constructor(ss58Format) {
    this.#ss58Format = ss58Format;
  }

  get ss58Format() {
    return this.#ss58Format;
  }
}

module.exports = { ChainProperties };

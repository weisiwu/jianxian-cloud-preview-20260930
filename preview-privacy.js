/* Preview-only adapter: use the game's supported tracking:false option.
 * No game bundle or asset bytes are modified. Loaded before game.js. */
(function (root) {
  'use strict';
  const registry = root.__JX_PKGS__ || { m: {}, screens: {} };
  let engine = null;
  function wrap(handle) {
    if (!handle || typeof handle.createApp !== 'function') return handle;
    const createApp = handle.createApp;
    return Object.assign({}, handle, {
      createApp(platform, options) {
        return createApp.call(handle, platform, Object.assign({}, options, { tracking: false }));
      },
    });
  }
  const previous = registry.engine;
  Object.defineProperty(registry, 'engine', {
    configurable: true, enumerable: true,
    get() { return engine; },
    set(handle) { engine = wrap(handle); },
  });
  root.__JX_PKGS__ = registry;
  registry.engine = previous || null;
  root.__JX_PREVIEW_PRIVACY__ = Object.freeze({ tracking: false, externalConnections: false });
})(globalThis);

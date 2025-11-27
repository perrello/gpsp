mergeInto(LibraryManager.library, {
  // JS-side storage for callbacks to be provided by the embedding app.
  // Postset ensures it's also reachable as Module.NetpacketBridge.
  $NetpacketBridge__deps: [],
  $NetpacketBridge__postset: 'if (typeof Module !== "undefined" && !Module.NetpacketBridge) Module.NetpacketBridge = NetpacketBridge;',
  $NetpacketBridge: {
    onSend: null,
    onPoll: null,
    onConnected: null,
    onDisconnected: null,
  },

  // allow JS to register its handlers: Module.setNetpacketHandlers({ send, poll, connected, disconnected })
  setNetpacketHandlers__deps: ['$NetpacketBridge'],
  setNetpacketHandlers: function (handlersPtr) {
    // handlersPtr is actually not used; we rely on Module.netpacketHandlers provided from JS.
    // This function exists so C can call into it to ensure the symbol is alive.
    return 0;
  },

  // C calls this to send a packet; we forward to JS.
  netpacket_send_js__deps: ['$NetpacketBridge'],
  netpacket_send_js: function (flags, buf, len, clientId) {
    if (!NetpacketBridge.onSend) return;
    const view = new Uint8Array(HEAPU8.buffer, buf, len);
    const copy = new Uint8Array(view); // copy because HEAP can move
    NetpacketBridge.onSend(flags, copy, clientId);
  },

  // C calls this to poll for incoming packets; JS can push data into C via receive below.
  netpacket_poll_js__deps: ['$NetpacketBridge'],
  netpacket_poll_js: function () {
    if (NetpacketBridge.onPoll) NetpacketBridge.onPoll();
  },

  netpacket_connected_js__deps: ['$NetpacketBridge'],
  netpacket_connected_js: function (clientId) {
    return NetpacketBridge.onConnected ? (NetpacketBridge.onConnected(clientId) ? 1 : 0) : 1;
  },

  netpacket_disconnected_js__deps: ['$NetpacketBridge'],
  netpacket_disconnected_js: function (clientId) {
    if (NetpacketBridge.onDisconnected) NetpacketBridge.onDisconnected(clientId);
  },
});

// Ensure both naming variants exist for the core factory so loaders can find it.
if (typeof gpsp === 'function' && typeof libretro_gpsp === 'undefined') {
  var libretro_gpsp = gpsp;
}

if (typeof libretro_gpsp === 'function' && typeof gpsp === 'undefined') {
  var gpsp = libretro_gpsp;
}

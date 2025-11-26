    .globl _open_gba_bios_rom
    .globl open_gba_bios_rom

    .type _open_gba_bios_rom, @object
    .type open_gba_bios_rom, @object

    .data
_open_gba_bios_rom:
open_gba_bios_rom:
    .incbin "bios/open_gba_bios.bin"

    .size _open_gba_bios_rom, .-_open_gba_bios_rom
    .size open_gba_bios_rom, .-open_gba_bios_rom
# mothership-assistant

Mothership assistant is a micro vtt for the Mothership tabletop RPG game by Tuesday Knight Games - www.tuesdayknightgames.com

Features included:

- character creation
- solo & multiplayer sessions
- warden view
- tracking of various elements: health, equipment, contractors, ammo

Please note that all your data is stored locally on your device.

Mothership assistant is currently in beta and temporarily available for limited personal use at https://mothership-assistant.surge.sh/. It should be useable as is. The plan is to improve the UI and review the various data tables before publishing a stable branch to a new url.

This is a fork of the original, from https://github.com/sbergot/mothership-assistant. I decided to publish my own version of this for my own players.

# Roadmap

## In development

- Guarantee implementation of 1e rules as written. To this end, test as much as posisble.

## Future plans:
- UI review:
  - Better font hierarchy.
  - Reduce various font sizes.
  - Make the UI denser.
  - Design a better "select" component instead of using buttons.
  - Show players other players in the session.
- Allow warden to rename Monster/NPC/Custom.
- Allow warden to transfer an NPC into a contractor. => Contractors are now identical to al other NPCs.
- Enable rolls for contractors.
- Put session code and player connections in separate warden tab.
- "Library" of components.
  - Requires the JSON schema used to represent entities to stabilize.
  - Stored in local storage.
  - Warden tab to allow export/import tables from library.
  - Can export/import library from main menu.
- Armor/weapons/equipment/contractors customization.
  - Currently these are stored in JSON objects in the source: the only way to
    add new ones is by adding to the source code. Perhaps the "library" of
    items can be a way to do this?
- Add portraits and images to items and characters.
  - Integrate with ashen-victor.itch.io.
- Import/export characters from the mobile app: this requires comparing JSON
  schema or at least converting between them.
  - Is the schema documented anywhere?
- Ship management.

## Completed
- Implement taking damage, taking armor into account.

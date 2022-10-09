class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._roomItem = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character
  }

  get roomItem() {
    return this._roomItem
  }


  set description(value) {
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  set roomItem(value) {
    this._roomItem = value;
  }

  describe() {
    return "You have entered the " + this._name + " and you see " + this._description;
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("This way is not accessible! Try another way!",);
      return this;
    }
  }
}

const Kitchen = new Room("kitchen");
Kitchen.description = "a large room with pantries filled to the brim with food that has gone mouldy due to years of neglect";
const grandHall = new Room("Grand hall");
grandHall.description = "a large room with a huge throne fit for a king, gathering dust";
const dungeon = new Room("Dungeon");
dungeon.description = "an ominous room filled with the corpses of the kings loyal men the vampire took prisoner. There are no other exits in this room.";
const crypt = new Room("crypt");
crypt.description = "a large dark crypt where the vampire sleeps at night";

grandHall.linkRoom("west", Kitchen);
grandHall.linkRoom("south", dungeon);
dungeon.linkRoom("north", grandHall);
Kitchen.linkRoom("east", grandHall);
Kitchen.linkRoom("south", crypt);
crypt.linkRoom("north", Kitchen);

const garlic = new Item("smelly clove of garlic");
garlic.description = " is mouldy and has a rancid smell you thought was coming from the cat."

console.log(garlic)

const fluffy = new Friend("fluffy");
fluffy.conversation = "Hello stranger, i've been locked away here as I was searching for food in the kitchen. Would you kindly free me?";
fluffy.description = "a cute fluffy cat, locked away in a cage";
fluffy.present = garlic;

console.log(fluffy);

const vampire = new Enemy("vampire");
vampire.description = "the evil vampire lord who has overtaken your castle!";
vampire.weakness = "garlic";
vampire.conversation = "Fight me to reclaim your throne!"

crypt.character = vampire;
dungeon.character = fluffy;


function displayRoomInfo(room) {
  let occupantMsg = "";
  let itemMsg = "";
  console.log(room);
  if (room.character === "") {
    if (room.roomItem == "") {
      occupantMsg = "";
    } else {
      console.log(room.roomItem.describe())
      occupantMsg = room.roomItem.describe();
    }
  } else {
    occupantMsg = room.character.describe() + ". ";
  }

  textContent = "<p>" + room.describe() + "</p>" + "<p>" +
    occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
  document.getElementById("usertext").focus();
}

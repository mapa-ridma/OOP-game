function startGame() {
  currentRoom = grandHall;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let command = document.getElementById("usertext").value.toLowerCase();
      const directions = ["north", "south", "east", "west"];
      const commands = ["fight", "free", "talk"];
      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else if (commands.includes(command)) {
        commandHandler(command, currentRoom.character)
      } else {
        document.getElementById("usertext").value = ""
        alert("Your character is unable to do that, try an action of north, west, south, east, fight, free, talk")
      }
    }
  });
}
  class Item {
    constructor(name) {
      this._name = name,
        this._description = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    set name(value) {
      this._name = value;
    }
  
    set description(value) {
      this._description = value;
    }

    describe() {
      return "You have found a " + this._name + ", the " + this._name + " is " + this._description;
    }
  }
  
  class Character {
    constructor(name) {
      this._name = name,
        this._description = ""
      this._talk = ""
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._talk;
    }
  
    set name(value) {
      this._name = value;
    }
  
    set description(value) {
      this._description = value;
    }

    set conversation(value) { 
      this._talk = value;
    }

    describe() {
      return "You have met " + this._name + ", " + this._name + " is " + this._description;
    }
  
    chat() {
      return this._name + " says " + "'" + this._talk + "'";
    }
  }
  
  class Enemy extends Character {
    constructor(name) {
      super(name);
      this._weakness = "";
    }
    get weakness() {
  
    }
  
    set weakness(value) {
      this._weakness = value;
    }
  
 
    fight(item) {
      if (item === this.present) {
        return true;
      } else {
        return false;
      }
    }
  
  }
  
  class Friend extends Character {
    constructor(name) {
      super(name)
      this._present = ""
    }
  
    get present() {
      return this._present
    }
  
    set present(value) {
      this._present = value
    }
  
    free() {
      return "you free " + this._name + ", " + this._name + " is so happy you freed her from the tyrany of the vampire and has given you a " + this._present.name +
        ", the " + this._present.name + this._present.description;
    }
  
  }
  
  
  function commandHandler(command, character) {
    switch (command) {
      case "fight":
        if (character.fight() === true) {
          msg = "congratulations you have vanquished " + character.name + " and reclaimed your rightful throne!";
          alert(msg)
        } else {
          alert("You died after fighting a heroic battle!")
        }
        break;
      case "talk":
        msg = character.chat();
        alert(msg)
        break;
      case "free":
        msg = character.free();
        alert(msg)
        break;
    }
  }
  
  
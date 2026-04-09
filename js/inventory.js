const Inventory = {
  items: [],

  init() {
    this.items = Storage.load("inventory");
  },

  add(item) {
    this.items.push(item);
    this.save();
  },

  remove(index) {
    this.items.splice(index, 1);
    this.save();
  },

  save() {
    Storage.save("inventory", this.items);
  }
};

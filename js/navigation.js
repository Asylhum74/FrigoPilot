const Shopping = {
  list: [],

  init() {
    this.generate();
  },

  generate() {
    let list = [];

    Inventory.items.forEach(item => {
      if (item.quantity <= 0) {
        list.push(item.name);
      }
    });

    this.list = list;
  }
};

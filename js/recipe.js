const Recipes = {
  list: [],

  init() {
    this.list = Storage.load("recipes");
  },

  add(recipe) {
    this.list.push(recipe);
    this.save();
  },

  save() {
    Storage.save("recipes", this.list);
  }
};

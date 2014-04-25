Entity.Player = function (template) {
  Entity.call(this, template);
  console.log("Player created.");
};
Entity.Player.extend(Entity);
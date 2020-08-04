"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoItems", [
      {
        task: "Training",
        deadline: "September",
        todoListId: 1,
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        task: "Buy a new club",
        deadline: "November",
        todoListId: 2,
        important: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};

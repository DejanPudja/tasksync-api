module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tasks", "parent_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("tasks", "parent_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "tasks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};

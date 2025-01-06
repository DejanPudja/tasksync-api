'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks', // Naziv tabele na koju se odnosi strani ključ
          key: 'id', // Kolona u tabeli 'tasks'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Naziv tabele na koju se odnosi strani ključ
          key: 'id', // Kolona u tabeli 'users'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      estimated_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tracked_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM("epic", "story", "task", "bug", "milestone"),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "backlog",
          "estimate",
          "ready to proceed",
          "bugs found",
          "in progress",
          "qa ready",
          "qa review",
          "deployment",
          "client review",
          "on hold",
          "done",
          "ready to bill",
          "completed"
        ),
        allowNull: false,
        defaultValue: "backlog",
      },
      priority: {
        type: Sequelize.ENUM("low", "normal", "high", "urgent"),
        allowNull: true,
      },
      release: {
        type: Sequelize.ENUM(
          "local",
          "develop",
          "staging",
          "live",
          "non-release",
          "beta env."
        ),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('task_details');
  },
};

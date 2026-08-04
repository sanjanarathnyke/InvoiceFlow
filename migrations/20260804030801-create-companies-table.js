'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable("companies", {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      address: {
        type: Sequelize.STRING,
        allowNull: true
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true
      },

      taxNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  }
};
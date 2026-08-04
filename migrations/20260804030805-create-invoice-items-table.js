'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable("invoiceItems", {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },

      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable("invoiceItems");
  }
};
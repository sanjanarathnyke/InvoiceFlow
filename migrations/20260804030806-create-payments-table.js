'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable("payments", {

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

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },

      method: {
        type: Sequelize.STRING,
        allowNull: true
      },

      reference: {
        type: Sequelize.STRING,
        allowNull: true
      },

      paymentDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    await queryInterface.dropTable("payments");
  }
};
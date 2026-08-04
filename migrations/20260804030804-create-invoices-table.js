'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable("invoices", {

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

      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "companies",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },

      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },

      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      issueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "draft"
      },

      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },

      tax: {
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
    await queryInterface.dropTable("invoices");
  }
};
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Progress = sequelize.define('Progress', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, 
    references: {
      model: 'Course',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'Progresses'
});

Progress.removeAttribute('id');

Progress.associate = models => {
  Progress.belongsTo(models.User, { foreignKey: 'userId' });
  Progress.belongsTo(models.Course, { foreignKey: 'courseId' });
};

module.exports = Progress;

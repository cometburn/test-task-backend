const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tasks.init({
    userId: DataTypes.INTEGER,
    task: DataTypes.STRING,
    desc: DataTypes.STRING,
    taskDate: DataTypes.DATEONLY,
    taskTime: DataTypes.TIME,
    isCompleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'task',
  });
  return tasks;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class checkins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  checkins.init({
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'checkin',
  });
  return checkins;
};

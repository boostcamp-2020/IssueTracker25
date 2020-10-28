import { DataTypes, Model } from 'sequelize';

const scheme = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const initOptions = {
  tableName: 'labels',
};

class Label extends Model {
  static init(sequelize) {
    return super.init(scheme, { sequelize, ...initOptions });
  }
}

export default Label;

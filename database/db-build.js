const {Sequelize, Model, DataTypes, Deferrable} = require('sequelize');

const sequelize = new Sequelize('atelier', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate().then(async() => {
  console.log('Connection established successfully');
  class Products extends Model {};
  Products.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    slogan: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING(999)
    },
    category: {
      type: DataTypes.STRING
    },
    default_price: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'product',
    timestamps: false
  });

  class Styles extends Model {};
  Styles.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Products,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    name: {
      type: DataTypes.TEXT
    },
    sale_price: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    original_price: {
      type: DataTypes.TEXT
    },
    default_style: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: 'style',
    timestamps: false
  });

  class SKUS extends Model {};
  SKUS.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    styleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Styles,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    size: {
      type: DataTypes.TEXT
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'skus',
    timestamps: false
  });

  class Photos extends Model {};
  Photos.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    styleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Styles,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'photos',
    timestamps: false
  });

  class Related extends Model {};
  Related.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    current_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Products,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    related_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Products,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    }
  },
  {
    sequelize,
    modelName: 'related',
    timestamps: false
  });

  class Features extends Model {};
  Features.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Products,
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    feature: {
      type: DataTypes.TEXT
    },
    value: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'feature',
    timestamps: false
  });

  class Intermediary extends Model{};
  Intermediary.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    current_product_id: {
      type: DataTypes.INTEGER
    },
    related_product_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'intermediaries',
    timestamps: false
  })

  await sequelize.sync({force: true})
}).catch((err) => {
  console.error('Unable to connect to the database:', err)
}).finally(() => {
  sequelize.close();
});

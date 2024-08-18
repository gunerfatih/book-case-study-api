const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const publisherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
publisherSchema.plugin(toJSON);
publisherSchema.plugin(paginate);

/**
 * @typedef Publisher
 */
const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;

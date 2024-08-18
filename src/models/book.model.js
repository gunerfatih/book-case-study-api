const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Publisher',
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Author',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

/**
 * @typedef Book
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

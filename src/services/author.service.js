const httpStatus = require('http-status');
const { Author } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Author
 * @param {Object} authorBody
 * @returns {Promise<Author>}
 */
const createAuthor = async (authorBody) => {
  return Author.create(authorBody);
};

/**
 * Query for books
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAuthors = async (filter, options) => {
  const authors = await Author.paginate(filter, options);
  return authors;
};

/**
 * Get Author by id
 * @param {ObjectId} id
 * @returns {Promise<Author>}
 */
const getAuthorById = async (id) => {
  return Author.findById(id);
};

/**
 * Update Author by id
 * @param {ObjectId} authorId
 * @param {Object} updateBody
 * @returns {Promise<Author>}
 */
const updateAuthorById = async (authorId, updateBody) => {
  const author = await getAuthorById(authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'author not found');
  }

  Object.assign(author, updateBody);
  await author.save();
  return author;
};

/**
 * Delete book by id
 * @param {ObjectId} authorId
 * @returns {Promise<Author>}
 */
const deleteAuthorById = async (authorId) => {
  const author = await getAuthorById(authorId);
  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, 'author not found');
  }
  await author.remove();
  return author;
};

module.exports = {
  createAuthor,
  queryAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};

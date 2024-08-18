const httpStatus = require('http-status');
const { Publisher } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a publisher
 * @param {Object} publisherBody
 * @returns {Promise<Publisher>}
 */
const createPublisher = async (publisherBody) => {
  return Publisher.create(publisherBody);
};

/**
 * Query for publishers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPublishers = async (filter, options) => {
  const publishers = await Publisher.paginate(filter, options);
  return publishers;
};

/**
 * Get publisher by id
 * @param {ObjectId} id
 * @returns {Promise<Publisher>}
 */
const getPublisherById = async (id) => {
  return Publisher.findById(id);
};


/**
 * Update publisher by id
 * @param {ObjectId} publisherId
 * @param {Object} updateBody
 * @returns {Promise<Publisher>}
 */
const updatePublisherById = async (publisherId, updateBody) => {
  const publisher = await getPublisherById(publisherId);
  if (!publisher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'publisher not found');
  }

  Object.assign(publisher, updateBody);
  await publisher.save();
  return publisher;
};

/**
 * Delete publisher by id
 * @param {ObjectId} publisherId
 * @returns {Promise<Publisher>}
 */
const deletePublisherById = async (publisherId) => {
  const publisher = await getPublisherById(publisherId);
  if (!publisher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'publisher not found');
  }
  await publisher.remove();
  return publisher;
};

module.exports = {
  createPublisher,
  queryPublishers,
  getPublisherById,
  updatePublisherById,
  deletePublisherById,
};

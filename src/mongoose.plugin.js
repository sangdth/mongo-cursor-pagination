
const find = require('./find');
const aggregate = require('./aggregate');
const _ = require('underscore');

/**
 * Mongoose plugin
 * @param {Object} schema mongoose schema.
 * @param {Object} options
 * @param {string} options.name name of the function.
 */

module.exports = function (schema, options) {

  /**
   * paginate function
   * @param {Object} param required parameter
   */

  const fn = function(param) {
    if (!this.collection) {
      throw new Error('collection property not found');
    }

    param = _.extend({}, param);
        
    return find(this.collection, param);
  };

  const aggregateFn = function(param) {
    console.log('mother fucker?');
    if (!this.collection) {
      throw new Error('collection property not found');
    }

    param = _.extend({}, param);
        
    return aggregate(this.collection, param);
  };

  if (options && options.name) {
    schema.statics[options.name] = fn;
  } else {
    schema.statics.paginate = aggregateFn;
  }
  // schema.statics.aggregate = aggregateFn;
};

'use strict';

const is = require('./is');

function join(images, opts = {}) {
  if (!Array.isArray(images)) {
    throw is.invalidParameterError('images to join', 'array', images);
  }
  if (!is.object(opts)) {
    throw is.invalidParameterError('options image to join', 'object', opts);
  }
  this.options.animatedImage = images.map(image => {
    if (!is.object(image)) {
      throw is.invalidParameterError('image to join', 'object', image);
    }
    const inputOptions = this._inputOptionsFromObject(image);
    const animatedImage = {
      input: this._createInputDescriptor(image.input, inputOptions, { allowStream: false }),
      // blend: 'over',
      // tile: false,
      // left: -1,
      // top: -1,
      // gravity: 0,
      // premultiplied: false
    };
    if (is.defined(opts.across)) {
      this.options.across = opts.across
    }
    if (is.defined(opts.shim)) {
      this.options.shim = opts.shim
    }
    if (is.defined(opts.background)) {
      this._setBackgroundColourOption('animatedBackground', opts.background)
    }
    return animatedImage;
    // if (is.defined(image.tile)) {
    //   if (is.bool(image.tile)) {
    //     animatedImage.tile = image.tile;
    //   } else {
    //     throw is.invalidParameterError('tile', 'boolean', image.tile);
    //   }
    // }
    // if (is.defined(image.left)) {
    //   if (is.integer(image.left) && image.left >= 0) {
    //     animatedImage.left = image.left;
    //   } else {
    //     throw is.invalidParameterError('left', 'positive integer', image.left);
    //   }
    // }
    // if (is.defined(image.top)) {
    //   if (is.integer(image.top) && image.top >= 0) {
    //     animatedImage.top = image.top;
    //   } else {
    //     throw is.invalidParameterError('top', 'positive integer', image.top);
    //   }
    // }
    // if (animatedImage.left !== animatedImage.top && Math.min(animatedImage.left, animatedImage.top) === -1) {
    //   throw new Error('Expected both left and top to be set');
    // }
    // if (is.defined(image.gravity)) {
    //   if (is.integer(image.gravity) && is.inRange(image.gravity, 0, 8)) {
    //     animatedImage.gravity = image.gravity;
    //   } else if (is.string(image.gravity) && is.integer(this.constructor.gravity[image.gravity])) {
    //     animatedImage.gravity = this.constructor.gravity[image.gravity];
    //   } else {
    //     throw is.invalidParameterError('gravity', 'valid gravity', image.gravity);
    //   }
    // }
    // if (is.defined(image.premultiplied)) {
    //   if (is.bool(image.premultiplied)) {
    //     animatedImage.premultiplied = image.premultiplied;
    //   } else {
    //     throw is.invalidParameterError('premultiplied', 'boolean', image.premultiplied);
    //   }
    // }

  });
  return this;
}

/**
 * Decorate the Sharp prototype with join-related functions.
 * @private
 */
module.exports = function (Sharp) {
  Sharp.prototype.join = join;
};

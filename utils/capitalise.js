function capitalise(str = 'no string given') {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  module.exports = capitalise
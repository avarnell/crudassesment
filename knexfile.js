// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/ggazette',
    pool: {
      min: 1,
      max: 1
    }
  },

};

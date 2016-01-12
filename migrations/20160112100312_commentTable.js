
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.string('story_id')
    table.string('text', [2000]).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments')
};


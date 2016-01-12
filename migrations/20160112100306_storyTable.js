
exports.up = function(knex, Promise) {
  return knex.schema.createTable('story', function(table){
    table.increments()
    table.string('title').notNullable();
    table.string('link').notNullable();
    table.string('image').notNullable();
    table.string('summary', [2500]).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('story')
  
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable("offers", t => {
    t.increments();
    t.integer("price_per_click")
      .nullable()
      .defaultTo(0);
    t.integer("price_per_impression")
      .nullable()
      .defaultTo(0);
    t.integer("num_applicants")
      .nullable()
      .defaultTo(0);
    t.integer("budget").notNullable();
    t.string("name").notNullable();
    t.string("description").notNullable();
    t.string("category").notNullable();
    t.string("currency").notNullable();
    t.string("status").notNullable();
    t.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("restrict");
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("offers");
};

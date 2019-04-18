exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("name");
    tbl.string("email");
    tbl.string("image_url");
    tbl.string("nickname");
    tbl.string("sub");
    tbl.string("acct_type");
    tbl.string("phone");
    tbl.float("amount").defaultTo(0);
    tbl.boolean("show_tour").defaultTo(true);
    tbl.boolean("show_ad_tour").defaultTo(true);
    tbl
      .string("stripe_cust_id", 128)
      .nullable()
      .unique();
    tbl.string("stripe_payout_id", 128).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

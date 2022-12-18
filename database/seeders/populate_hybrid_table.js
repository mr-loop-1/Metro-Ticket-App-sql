/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Hybrid').del()
  await knex('Hybrid').insert([
	  {Hybrid_ID: 1, Star_Town: 15, Shipyard: 10, Airport: 11, Food_Street: 9},
    {Hybrid_ID: 2, Star_Town: 13, Shipyard: 16, Airport: 5, Food_Street: 7},
    {Hybrid_ID: 3, Star_Town: 20, Shipyard: 15, Airport: 4, Food_Street: 10},
    {Hybrid_ID: 4, Star_Town: NULL, Shipyard: NULL, Airport: 3, Food_Street: NULL}, 
    {Hybrid_ID: 5, Star_Town: NULL, Shipyard: NULL, Airport: 8, Food_Street: NULL},
    {Hybrid_ID: 6, Star_Town: NULL, Shipyard: NULL, Airport:  NULL, Food_Street:  NULL},
  ]);
};

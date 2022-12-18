/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('half').del()
  await knex('half').insert([
    { Shipyard: 'Forest_Hills', Airport: 'Sheep_Village'}, 
    { Shipyard: 'Downtown', Airport: 'Govt_Office'}, 
    { Shipyard: 'Vice_Port', Airport: 'Star_Town'}, 
    { Shipyard: 'Vice_City_Beach', Airport: 'Old_City'}, 
    { Shipyard: 'Prawn_Island', Airport: 'Leaf_Links'}, 
    { Shipyard: 'Little_Haiti', Airport: 'City_Scrap'}, 
    { Shipyard: 'Ocean_Beach', Airport: 'New_Downtown'}, 
    { Shipyard: 'Food_Street', Airport: 'Subways'}, 
    { Shipyard: 'Grand_Library', Airport: 'Trench'}
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Station').del()
  await knex('Station').insert([
    {Station_ID: 1, Name: 'Forest_Hills', Prev_Station: null, Next_Station: 2, Color: '056C4F'},
    {Station_ID: 2, Name: 'Downtown', Prev_Station: 1, Next_Station: 3, Color: '056C4F'},
    {Station_ID: 3, Name: 'Vice_Port', Prev_Station: 2, Next_Station: 10, Color: '056C4F'},
    {Station_ID: 4, Name: 'Vice_City_Beach', Prev_Station: null, Next_Station: 10, Color: 'F0B207'},
    {Station_ID: 5, Name: 'Prawn_Island', Prev_Station: null, Next_Station: 10, Color: '056C4F'},
    {Station_ID: 6, Name: 'Little_Haiti', Prev_Station: null, Next_Station: 7, Color: 'F0B207'},
    {Station_ID: 7, Name: 'Ocean_Beach', Prev_Station: 6, Next_Station: 8, Color: 'F0B207'},
    {Station_ID: 8, Name: 'Food_Street', Prev_Station: -1, Next_Station: -1, Color: 'B73F1D'},
    {Station_ID: 9, Name: 'Grand_Library', Prev_Station: null, Next_Station: 8, Color: 'B73F1D'},
    {Station_ID: 10, Name: 'Airport', Prev_Station: -1, Next_Station: -1, Color: 'B73F1D'},
    {Station_ID: 11, Name: 'Shipyard', Prev_Station: -1, Next_Station: -1, Color: 'B73F1D'},
    {Station_ID: 12, Name: 'Sheep_Village', Prev_Station: null, Next_Station: 13, Color: '754723'},
    {Station_ID: 13, Name: 'Govt_Office', Prev_Station: 12, Next_Station: 14, Color: '754723'},
    {Station_ID: 14, Name: 'Star_Town', Prev_Station: -1, Next_Station: -1, Color: 'B73F1D'},
    {Station_ID: 15, Name: 'Old_City', Prev_Station: 14, Next_Station: 11, Color: 'B73F1D'},
    {Station_ID: 16, Name: 'Leaf_Links', Prev_Station: 17, Next_Station: 11, Color: '699C40'},
    {Station_ID: 17, Name: 'City_Scrap', Prev_Station: 18, Next_Station: 16, Color: '699C40'},
    {Station_ID: 18, Name: 'New_Downtown', Prev_Station: 19, Next_Station: 17, Color: '699C40'},
    {Station_ID: 19, Name: 'Subways', Prev_Station:null, Next_Station: 18, Color: '699C40'},
    {Station_ID: 20, Name: 'Trench', Prev_Station:null, Next_Station: 14, Color: '754723'},
  ]);
};

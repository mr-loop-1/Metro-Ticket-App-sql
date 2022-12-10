const { Model } = require('objection');
const Knex = require('knex');

Model.knex(knex);

class Ticket extends Model {
    static get tableName() {
      return 'tickets';
    }
  
    static get relationMappings() {
      return {
        children: {
          relation: Model.HasManyRelation,
          modelClass: Person,
          join: {
            from: 'persons.id',
            to: 'persons.parentId'
          }
        }
      };
    }
  } 
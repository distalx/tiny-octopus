const expect = require ('chai').expect;
const Task = require('./task');


describe('Task',function(){
  describe('Valid Task',function(){
    const task = {
      source_c: "users",
      destination_c: ['posts', 'comments'],
      source_f: "_id",
      destination_f: "author.id",
      fields: {
        'username': "author.username"
      }
    };

    it('Valid task',function(){
      expect(new Task(task)).be.a('object');
    });


  });

  describe('Invalid Task',function(){

    it('Invalid source collection',function(){
      const task = {
        destination_c: ['posts', 'comments'],
        source_f: "_id",
        destination_f: "author.id",
        fields: {
          'username': "author.username"
        }
      };
      expect( () => new Task(task)).to.throw();
      expect( () => new Task(task)).to.throw('Invalid source collection');
    });

    it('Invalid destination collection',function(){
      const task = {
        source_c: "users",
        destination_c: "xxx",
        source_f: "_id",
        destination_f: "author.id",
        fields: {
          'username': "author.username"
        }
      };
      expect( () => new Task(task)).to.throw();
      expect( () => new Task(task)).to.throw('Invalid destination collection');
    });

    it('Invalid source field',function(){
      const task = {
        source_c: "users",
        destination_c: ['posts', 'comments'],
        destination_f: "author.id",
        fields: {
          'username': "author.username"
        }
      };
      expect( () => new Task(task)).to.throw();
      expect( () => new Task(task)).to.throw('Invalid source field');
    });

    it('Invalid destination field',function(){
      const task = {
        source_c: "users",
        destination_c: ['posts', 'comments'],
        source_f: "_id",
        fields: {
          'username': "author.username"
        }
      };
      expect( () => new Task(task)).to.throw();
      expect( () => new Task(task)).to.throw('Invalid destination field');
    });

    it('Invalid fields',function(){
      const task = {
        source_c: "users",
        destination_c: ['posts', 'comments'],
        source_f: "_id",
        destination_f: "author.id"
      };
      expect( () => new Task(task)).to.throw();
      expect( () => new Task(task)).to.throw('Invalid fields');
    });

  });

});

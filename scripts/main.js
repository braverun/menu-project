(function(){

  var MenuItem = Backbone.Model.extend({
  defaults: {
    image: '',
    name: '',
    brewery: '',
    description: '',
    price: '',
    type: '',
  }
});

  var MenuCollection = Backbone.Collection.extend({
    url: 'https://api.parse.com/1/classes/menuItems',
    model: MenuItem,

    parse: function(response){
      console.log(response);
    return response.results;
  }

  });



  var MenuView = Backbone.View.extend({
    template: _.template($('[data-template-name=beers]').text()),

    render: function(){
      $('.js-lagers').html(this.template(this.model.toJSON()));
    }

  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    initialize: function(){

      this.menuCollection = new MenuCollection();
      this.menu = new MenuView({collection: this.menuCollection});
    },

    index: function(){
      var self = this;
      this.menuCollection.fetch().done(function(){
          self.menu.render();

      });



    },


  });

  $.ajaxSetup({
     headers: {
       "X-Parse-Application-Id": "En0HvlSzhghm8rQbbxEudy4jff7J84lvC7C2tWKh",
       "X-Parse-REST-API-Key": "B9DuWgGoXgSD5SS8Dktluut9E73E25qba1sDJL09"
     }
   });


  $(document).ready(function(){
    $(".js-sticky-containers").sticky({topSpacing:100});
    window.router = new AppRouter();
    Backbone.history.start();
    console.log('ninja boots');
  });

})();

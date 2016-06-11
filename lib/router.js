Router.route('/', function () {
  this.render('body')
  this.wait(
    Meteor.subscribe('tasks'),
    Meteor.subscribe('projects')
  );
});

Router.route('/:_id', function () {
  /*
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
  */
  console.log(this.params._id)
});
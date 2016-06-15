import { Tasks } from '../imports/api/tasks.js'
import { Projects } from '../imports/api/projects.js'

Router.route('/', function () {
  this.render('')

  this.wait(
    Meteor.subscribe('tasks'),
    Meteor.subscribe('projects')
  )

  if (this.ready()) {
    if(Tasks.find({username: Meteor.user().username}).count() == 0 && Projects.find({username: Meteor.user().username}).count() == 0){
      const project = 'Welcome tour'

      Meteor.call('tasks.insert', 'To view your completed tasks, press the green button. Or on mobile - the white circle top right!', project)

      setTimeout(function(){
        Meteor.call('tasks.insert', 'To check a task as completed, click the white circle.', project)
        setTimeout(function(){
          Meteor.call('tasks.insert', 'You can create a new project / todolist by clicking on the blue button. Or in the menu if you are on mobile.', project)
          setTimeout(function(){
            Meteor.call('tasks.insert', 'Welcome!', project)
          },500)
        },500)
      },500)
      
      Meteor.call('projects.insert', project)
      Session.set('currentProject', project)
    }
  }
})

Router.route('/:_id', function () {
  /*
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
  */
  console.log(this.params._id)
});
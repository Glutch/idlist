import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
 
import { Tasks } from '../api/tasks.js'
 
import './task.html'
 
Template.task.events({
  'click .checkBox'() {
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id)
  },
  'click .task'(e) {
    console.log()
  },
  'focus .task'(e) {
    const text = $(e.target).text()
    Session.set('taskText', text)
  },
  'blur .task'(e) {
    const text = $(e.target).text()
    if(text != Session.get('taskText')){

      const height = $(e.target).height()
      $(e.target).height(height)
      
      $(e.target).text('')
      
      Meteor.call('tasks.update', this._id, text)

      $(e.target).parent().addClass('saved')
      
      setTimeout(function(){
        $(e.target).parent().removeClass('saved')
        $(e.target).height('auto')
      },1000)
    
    }
  }
})
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
  'blur .task'(e) {
    const text = $(e.target).text()
    Meteor.call('tasks.update', this._id, text)
  },
  'blur li'(e){
    $(e.target).parent().addClass('saved')
    setTimeout(function(){
      $(e.target).parent().removeClass('saved')
    },500)
  }
})
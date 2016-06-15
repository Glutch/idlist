import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import { Tasks } from '../api/tasks.js'
import { Projects } from '../api/projects.js'
 
import './body.html'
import './sidebar.js'
import './task.js'

Session.setDefault('showCompleted', true)
Session.setDefault('currentProject', 'Loading')

Template.body.helpers({
  currentProject(){
    if (Session.get('currentProject') == 'Loading'){
      Session.set('currentProject', Projects.findOne({}, { sort: { createdAt: -1 } })['name'])
    }
    if (Projects.find({username: Meteor.user().username}).count() == 0){
      return false
    }
    return Session.get('currentProject')
  },
  tasks() {
    const currentProject = Session.get('currentProject')
    
    if (Session.get('showCompleted')) {
      return Tasks.find({ checked: { $ne: true }, project: currentProject }, { sort: { createdAt: -1 } })
    } else {
      return Tasks.find({project: currentProject}, {sort:{createdAt: -1}})
    }
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count()
  },
  menuImage(){
    if(Session.get('sidebarActive')){
      return '/images/close.svg'
    } else {
      return '/images/menu.svg'
    }
  }
})



Template.body.events({
  'click .menuActivate'(e){
    Session.set('sidebarActive', !Session.get('sidebarActive'))
  },
  'click .deleteProject'() {
    Meteor.call('projects.remove', Session.get('currentProject'))
    Session.set('currentProject', Projects.findOne({}, { sort: { createdAt: -1 } })['name'])
    $('.project:first').addClass('projectActive')
  },
  'click .hideCompleted'() {
    Session.set('showCompleted', !Session.get('showCompleted'))
  },
  'click .logout'(){
      AccountsTemplates.logout()
  },
  'click .newTask'(e){
    if($('.newTask').text('Type to add new tasks')){
      $('.newTask').text('')
    }
  },
  'keydown .newTask'(e) {
    if (e.keyCode == 13) {
      if(!e.shiftKey){
        e.preventDefault()
        if($('.newTask').text() != ''){
          const text = $('.newTask').text()
          const project = Session.get('currentProject')
    
          Meteor.call('tasks.insert', text, project)

          $('.newTask').text('')
        }
      }
    }
  }
})
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import { Tasks } from '../api/tasks.js'
import { Projects } from '../api/projects.js'

import './sidebar.html'
import './project.js'


Template.sidebar.helpers({
  projects() {
    return Projects.find({}, { sort: { createdAt: -1 } })
  },
  currentUsername() {
    return Meteor.user().username
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
  hideCompletedCircle() {
    if (!Session.get('showCompleted')){
      return 'circleActive'
    }
  },
  sidebarActive(){
    if(Session.get('sidebarActive')){
      return 'sidebarActive'
    } else {
      return ''
    }
  }
})


Template.sidebar.events({
  'click .addProject'(e){
    $('.newProject').addClass('visible')
    $('.newProject').focus()
  },
  'blur .newProject'(e){
    $('.newProject').removeClass('visible')
  },
  'keydown .newProject'(e) {
    console.log('pressed')
    if (e.keyCode == 13) {
      console.log('enter pressed')
      e.preventDefault()
      if($('.newProject').val() != ''){
        console.log('val wasnt empty')
        const name = $('.newProject').val()
  
        Meteor.call('projects.insert', name)

        $('.newProject').val('')

        $('.newProject').removeClass('visible')

        Session.set('currentProject', name)
      }
    }
  }
})
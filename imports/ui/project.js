import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
 
import { Projects } from '../api/projects.js'
 
import './project.html'
 
Template.project.events({
  'click .project'(e) {
    Session.set('currentProject', $(e.target).text())
  },
})

Template.project.helpers({
  active(){
    if(this.name == Session.get('currentProject')){
      return 'projectActive'
    }
  }
})
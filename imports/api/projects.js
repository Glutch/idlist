import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
 
export const Projects = new Mongo.Collection('projects')

if (Meteor.isServer) {
  // This code only runs on the server (when fetched at /server/main.js)

  Meteor.publish('projects', function projectsPublication() {
    return Projects.find({ owner: this.userId })
  })
}

Meteor.methods({
  'projects.insert'(name) {
    check(name, String)
 
    // Make sure the user is logged in before inserting a project
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
 
    Projects.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },
  'projects.remove'(projectName) {
    check(projectName, String)
 
    Projects.remove({name: projectName})
  }
})
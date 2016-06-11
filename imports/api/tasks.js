import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
 
export const Tasks = new Mongo.Collection('tasks')

if (Meteor.isServer) {
  // This code only runs on the server

  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({ owner: this.userId });
  });
}

Meteor.methods({
  'tasks.insert'(text, project) {
    check(text, String)
    check(project, String)
 
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
 
    Tasks.insert({
      text,
      project,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    })
  },
  'tasks.update'(taskId, text) {
    check(taskId, String)
    check(text, String)
 
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
 
    Tasks.update(taskId, { $set: { text: text } })
  },
  'tasks.remove'(taskId) {
    check(taskId, String)
 
    Tasks.remove(taskId)
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String)
    check(setChecked, Boolean)
 
    Tasks.update(taskId, { $set: { checked: setChecked } })
  },
})
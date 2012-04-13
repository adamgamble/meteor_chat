Users = new Meteor.Collection("users");
Messages = new Meteor.Collection("messages");


if (Meteor.is_client) {
  Template.user_list.users = function () {
    return Users.find({});
  }
  Template.user_list.user_class = function() {
    return Session.equals("current_user_id", this._id) ? "current_user" : ""; 
  }

  Template.user_list.current_user = function() {
      return Users.findOne(Session.get("current_user_id"));
  }

  Template.chat_room.current_user = function() {
      return Users.findOne(Session.get("current_user_id"));
  }
  Template.chat_room.messages = function() {
    return Messages.find();
  }
  Template.chat_room.message_content = function() {
    return Users.findOne(this.user_id).email_address + ": " + this.message_body
  }

  Template.create_user.current_user = function() {
      return Users.findOne(Session.get("current_user_id"));
  }

  Template.chat_controls.current_user = function() {
      return Users.findOne(Session.get("current_user_id"));
  }

  Template.create_user.events = {
    'click input.new_user_button': function () {
      user_id = Users.insert({email_address: $('#email_address').val()});
      Session.set("current_user_id", user_id);
    }};

  Template.chat_controls.events = {
    'click input#send_message': function () {
      Messages.insert({message_body: $('#message').val(), user_id: Session.get("current_user_id")});
      $('#message').val("");
    }};
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Imports
var models   = require('../models');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib = require('async');


// Routes
module.exports = {
  dislikePost: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Message.findOne({
          where: { id: messageId }
        })
        .then(function(messageFound) {
          done(null, messageFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify message' });
        });
      },
      function(messageFound, done) {
        if(messageFound) {
          models.User.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, messageFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        } else {
          res.status(404).json({ 'error': 'post already disliked' });
        }
      },
      function(messageFound, userFound, done) {
        if(userFound) {
          models.disLike.findOne({
            where: {
              userId: userId,
              messageId: messageId
            }
          })
          .then(function(isUserAlreadydisLiked) {
            done(null, messageFound, userFound, isUserAlreadydisLiked);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify is user already disliked' });
          });
        } else {
          res.status(404).json({ 'error': 'user not exist' });
        }
      },
      function(messageFound, userFound, isUserAlreadydisLiked, done) {
        if(!isUserAlreadydisLiked) {
          messageFound.addUser(userFound)
          .then(function (alreadydisLikeFound) {
            done(null, messageFound, userFound, isUserAlreadydisLiked);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to set user reaction' });
          });
        } else {
            res.status(409).json({ 'error': 'message already disliked' });
          }

      },
      function(messageFound, userFound, done) {
        messageFound.update({
          dislikes: messageFound.dislikes + 1,
        }).then(function() {
          done(messageFound);
        }).catch(function(err) {
          res.status(500).json({ 'error': 'message is disliked' });
        });
      },
    ], function(messageFound) {
      if (messageFound) {
        return res.status(201).json(messageFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update message' });
      }
    });
  }
}
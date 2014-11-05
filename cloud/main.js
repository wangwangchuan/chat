require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
var mlog = require('cloud/mlog');
var mutil = require('cloud/mutil');
var muser = require('cloud/muser');
var madd=require('cloud/madd');
var mgroup=require('cloud/mgroup.js');

function handleRequest(req, res, handleRelationFn) {
  var params = req.params;
  //var toUserId = params.toUserId;
  var fromUserId = params.fromUserId;
  var toUserId = params.toUserId;
  handleRelationFn(fromUserId, toUserId).then(function () {
    res.success();
  }, mutil.cloudErrorFn(res));
}

AV.Cloud.define("addFriend", function (req, res) {
  handleRequest(req, res, muser.addFriendForBoth);
});

AV.Cloud.define("removeFriend", function (req, res) {
  handleRequest(req, res, muser.removeFriendForBoth);
});

AV.Cloud.define("tryCreateAddRequest",madd.tryCreateAddRequest);
AV.Cloud.define("agreeAddRequest",madd.agreeAddRequest);
AV.Cloud.define("saveChatGroup",mgroup.saveChatGroup);
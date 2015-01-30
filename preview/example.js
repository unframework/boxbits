
bb = require('boxbits');

var topBar = bb.box().north().wide();

var topMenu = bb.box().in(topBar).west();

var topBarLogo = bb.icon().in(topBar).center();

var tweetButton = bb.box().in(topBar).east();
var profileIcon = bb.box().in(topBar).east();
var searchBox = bb.box().in(topBar).east();

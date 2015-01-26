
un = require('unwidgets');

var topBar = un.box().north().wide();

var topMenu = un.box().in(topBar).west();

var topBarLogo = un.icon().in(topBar).center();

var tweetButton = un.box().in(topBar).east();
var profileIcon = un.box().in(topBar).east();
var searchBox = un.box().in(topBar).east();

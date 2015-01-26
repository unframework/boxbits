
un = require('unwidgets');

var topBar = un.addBox().pullNorth().fillWidth();

var topMenu = un.addBox().placeInside(topBar).pullWest();

var topBarLogo = un.addBox().placeInside(topBar).center().makeIcon();

var tweetButton = un.addBox().placeInside(topBar).pullEast();
var profileIcon = un.addBox().placeInside(topBar).pullEast();
var searchBox = un.addBox().placeInside(topBar).pullEast();

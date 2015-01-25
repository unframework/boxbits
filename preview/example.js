
un = require('unwidgets');

var topBar = un.addBox().attachBelow(un.windowTop());

var topMenu = un.addBox().placeInside(topBar).pullWest();

var topBarLogo = un.addBox().placeInside(topBar).makeIcon();

var tweetButton = un.addBox().placeInside(topBar).pullEast();
var profileIcon = un.addBox().placeInside(topBar).pullEast();
var searchBox = un.addBox().placeInside(topBar).pullEast();

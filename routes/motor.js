// Imports
var models   = require('../models');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib = require('async');

// Envoi de la requête de recherche à l'API
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:6677/search?q=keyword&filter=value');
xhr.setRequestHeader('Authorization', 'Bearer YOUR_ACCESS_TOKEN');
xhr.onload = function() {
  if (xhr.status === 200) {
    const results = processResults(xhr.responseText);
  } else {
    console.error('Error searching:', xhr.status);
  }
};
xhr.send();

// Fonction de traitement des résultats de la recherche
function processResults(response) {
 
  return results;
}




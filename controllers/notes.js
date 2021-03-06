// Controller for our notes
// ============================

// import scrape and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// import models
var Article = require("../models/Article");

module.exports = {
    fetch: function(cb) {
        // run scrape function
        scrape(function(data) {
            // make sure note has data and not automatically saved
            for (var i = 0; i < articles.length; i++) {
                data[i].date = makeDate();
                data[i].saved = false;
            }

            // use mongo models to be able to insert notes 
            Article.collection.insertMany(data, { ordered: false }, function(err, docs) {
                cd(err, docs);
            });
        });
    },
    delete: function(query, cb) {
        Article.remove(query, cb);
    },
    get: function(query, cb) {
        // query to get data scraped, and sort starting from most recent
        Article.find(query)
            .sort({
                _id: -1
            })
            // execute query
            .exec(function(err, doc) {
                // pass into callback function
                cb(doc);
            });
    },
    update: function(query, cb) {
        // update specified note to specific article id
        Article.update({ _id: query._id }, {
            $set: query
        }, {}, cb);
    }
};
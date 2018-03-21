var mysql = require('mysql');
var http = require('http');
var express = require('express');
var app = express();
var connection = require('express-myconnection');
app.set('port', 4300);
app.use(express.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'articlemanager'

    },'single')

);
var articlesList = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM article',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json(rows);
        });
    });

};
var addArticle = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('insert into article (title, author, content) values ("' + req.body.title + '","' + req.body.author +'","' + req.body.content +'") ',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json(rows);
        });
    });

};

var deleteArticle = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('delete from article where id=' + req.params.id,function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json(rows);
        });
    });

};


var getArticle = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('select id, author, title, content from article where id=' + req.params.id,function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json(rows);
        });
    });

};
var updateArticle = function(req, res){

    req.getConnection(function(err,connection){

        var query = connection.query('update article set title=\''+req.body.title+'\',author=\''+req.body.author+'\',content=\''+req.body.content+'\' where id=' + req.params.id,function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.json(rows);
        });
    });

};

app.get('/articlesList' , function (request, response) {
    articlesList(request, response);
});
app.post('/addArticle', function (request, response) {
    addArticle(request, response);
});
app.delete('/deleteArticle/:id', function (request, response) {
   deleteArticle(request, response);
});
app.get('/getArticle/:id', function (request, response) {
   getArticle(request, response);
});
app.post('/editArticle/:id', function (request, response) {
    updateArticle(request, response);
});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
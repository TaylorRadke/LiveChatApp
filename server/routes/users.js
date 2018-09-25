module.exports = function(app,dbo){
    //Get the permissions of a user
    app.get("/api/:username/permissions",function(req,res){
        console.log("Request for user permissions");
        var uname = req.params.username;
        var userExists = false;
        dbo.collection("users").findOne({"username":uname},function(err,result){
            if (err) console.log(err);
            res.send({"username":result.username, "permissions":result.permissions});
        });
    })

    //Change the permissions of a user
    app.post("/api/users/permissions",function(req,res){
        var userModifyPermissions = req.body.username;
        var newPermissions = req.body.permissions;

        dbo.collection("users").updateOne({"username":userModifyPermissions},{
            $set:{"permissions":newPermissions}
        },function(err,result){
            if (err) console.log(err);
            if (result.result.nModified == 1){
               res.send({"update":{"user":userModifyPermissions,"permissions":newPermissions},"success":true});
            }else{
                res.send({"update":{"user":userModifyPermissions,"permissions":newPermissions},"success":false});
            }
            
        });   
    })

    //Add a new user
    app.post('/api/users',function(req,res){
        
        var uname = req.body.username;
        var password = req.body.password;
        
        dbo.collection("users").findOne({"username":uname},function(err,result){
            if (err) console.log(err);
            else{
                if (result == null){
                    dbo.collection("users").insertOne({"username":uname,"password":password},function(err,result){
                        if (err) console.log(err);
                        else res.send({"success":true});
                    });
                }else{
                    res.send({"success":false});
                }
            }
        })

    })

    //Get a list of all users
    app.get('/api/users',function(req,res){
        dbo.collection("users").find({}).toArray(function(err,result){
            if (err) console.log(err);
            var users = [];
            result.forEach(function(element){
                users.push(element.username);
            });
            res.send({"users":users});
        })
    })

    //Login as a user which has been created
    app.post('/api/users/login',function(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        var authLogin = false;

    })

    //User logout, does not delete user from list of users
    app.post('/api/users/logout',function(req,res){
        var username = req.body.username;
        
        var successfulLogout = false;

    })

    //delete a user from the list of users and all groups and channels that the user is in 
    app.delete('/api/users/:username',function(req,res){
        var userExists = false;
        var user = req.params.username;


    });
}
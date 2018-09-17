#SAMPLE REST API USING NODE JS & EXPRESS JS & MONGODB

#If You Want To Test My API Yourself You Have To Change Some Security Option like the following

#step-1
# you want to create your own database.

#step-2
# change something on the nodemon.json file as,
#"MONGO_USER_NAME": provide your username
# "MONGO_PASSWORD": provide the password of your databse

step-3 
# paste your database driver url as first perameter of mongoose.conect() method on the app.js file and change where you have to put your username & password like the following
mongoose.connect('mongodb://' + process.env.MONGO_USER_NAME + ':' + process.env.MONGO_PASSWORD + '@ds018238.mlab.com:18238/test_db);

#API would pop up errors If you did not change those option when you test this API yourself.
#I prevented you guys seeing my username and password for good bcoz if anyone got my database password, he could step into my databse.

#API Sucessfully Tested on Postman
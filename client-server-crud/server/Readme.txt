API URL :   

Type	API_URL						 

For users:
--------------
GET	http://localhost:3000/v1/getTraineeList {
    "code": 200,
 "status": true,
 "message": "Trainee found.",
"data": [
 {
 "created_at": "2017-07-31T19:14:33.618Z",
            "status": null,
            "phone": 2222222,
            "email": "uds214125@gmail.com",
            "password": "",
 "lastname": "kumar",
 "firstname": "uday1",
 "username": "uds214125"
    ]
}
POST	http://localhost:3000/v1/signin		
 	
	Parameters in Header :
	
	username:uds2141
	password:uds@214125
	Content-Type:application/x-www-form-urlencoded 
	
	{
    "status": true,
    "message": "Successful",
    "token": "uds@214125"
}


POST	http://localhost:3000/v1/register

	Parameters in Body :
	
	username:udp
	firstname:ud2
	lastname:udd1
	password:udp@30
	email:udp@hotmail.com
	phone:''

	on success : {
    "status": true,
    "message": "Successful"
}
	
For Tasks :
-------------

GET	http://localhost:3000/v1/getTask 
	on success : [
    {
        "_id": "597c7d9c5aea9015800d057a",
        "tasktype": 1,
        "__v": 0,
        "updated_at": null,
        "created_at": "2017-07-31T19:22:48.669Z",
        "status": null,
        "assignto": "",
        "description": "doing web programming with reactive style in angular2",
        "taskname": "do web programming"
    }]

POST	http://localhost:3000/v1/addTask
	
	Parameters in Body :

	trainee:uds
	taskname:implment edit feature
	description:edit & update then show on admin desk
	tasktype:2

	on success :{
    "__v": 0,
    "_id": "597f8573cb6ab01244af7264",
    "updated_at": null,
    "created_at": "2017-07-31T19:22:48.669Z",
    "status": 1,
    "assignto": "",
    "description": "",
    "taskname": ""
}

DELETE 	http://localhost:3000/v1/deleteTask/id
	
	Parameters in Url:
	http://localhost:3000/v1/deleteTask/597f8573cb6ab01244af7264
	
	on success : {
    "status": true,
    "message": "Successful"
}

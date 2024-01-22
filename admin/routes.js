import * as dao from "./dao.js";



function AdminRoutes(app, client) {


    function generateRandomNumbers(n, min, max) {
        let randomNumbers = [];
      
        for (let i = 0; i < n; i++) {
          let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          randomNumbers.push(randomNum);
        }
      
        return randomNumbers;
      }




    const getUsers =  async (req, res) => {

        const users = await dao.getUsers(client); 
        console.log("session value: "+ req.session['currentUser'])

        if(req.session['currentUser'] === undefined){

            let randomIDs = generateRandomNumbers(4, 1, 10);
       
            const randUsers = users.filter(usr => randomIDs.includes(usr.id) );
            res.json(randUsers);

            
        }
        else{
            res.json(users);
        }



    }

    const signin = async (req, res) => {

        const { username, password } = req.body;
        const currentUsr = await dao.findAdminByCredentials(client, username, password);
        
        req.session['currentUser'] = currentUsr;
        console.log("session currentusr: "+  JSON.stringify(req.session['currentUser']))
        res.json(currentUsr);
    
    };

    const signup = async (req, res) => {


        console.log("data while signup: "+ JSON.stringify(req.body))

        const user = await dao.findUserByUsername(client,req.body.username);
        console.log("insdie signup: "+ JSON.stringify(user[0]))

        if (user[0] === undefined) {

            const currentUsr = await dao.createUser(client, req.body);
            req.session['currentUser'] = currentUsr;
            res.json(currentUsr);

        }
        else{
            res.status(404).json(
                { message: "Username already taken" });
        }

    
    };

    const findUserByUniv = async (req, res) => {

        // console.log("data while signup: "+ JSON.stringify(req.body))

        const { univ } = req.params;
        console.log("univ: "+ univ)
        const user = await dao.findUserByUniv(client,univ);


        if (user[0] === undefined) {

            res.status(404).json(
                { message: "no records found" });

        }
        res.json(user)

    
    };

    const deleteUser = async (req, res) => {


        let { userId } = req.params;
        userId = parseInt(userId)
        const user = await dao.deleteUserById(client,userId);


            req.session['currentUser'] = null;
            res.json({"message": "done"})
        

    
    };

    const deleteUniv = async (req, res) => {


        let { univ } = req.params;
        //userId = parseInt(userId)
        const user = await dao.deleteUserByUniv(client,univ);


            //req.session['currentUser'] = null;
            res.json({"message": "done"})
        

    
    };

    const findUserById = async (req, res) => {


        let { userId } = req.params;
        userId = parseInt(userId)
        const user = await dao.findUserById(client,userId);

        //req.session['currentUser'] = user;
        res.json(user);
        

    
    };

    const updateUser = async (req, res) => {

        
        let { userId } = req.params;
        userId = parseInt(userId)
        console.log('here: '+ userId)
        const user = await dao.updateUser(client,userId, req.body);
        // req.session['currentUser'] = user;
        res.json(user)
        

    
    };

    const updateAdmin = async (req, res) => {

        
        let { adminId } = req.params;
        adminId = parseInt(adminId)
        console.log('heree: '+ adminId)
        const user = await dao.updateAdmin(client, adminId, req.body);
        req.session['currentUser'] = user;
        res.json(user)
        

    
    };

    const signout = (req, res) => {

        // currentUser = null;
        // res.json(200);
        req.session.destroy();
        res.json(200);
       }; 

    const account = async (req, res) => { 

        //res.json(currentUser);
        console.log(" in acct: "+ req.session['currentUser'])
        res.json(req.session['currentUser']);
      };

    const createUser = async (req, res) => {


        console.log("data while creating user: "+ JSON.stringify(req.body))

        const user = await dao.findUserByUsername(client,req.body.username);
        console.log("insdie signup: "+ JSON.stringify(user[0]))

        if (user[0] === undefined) {

            const currentUsr = await dao.createUser(client, req.body);
            //req.session['currentUser'] = currentUsr;
            res.json(currentUsr);

        }
        else{
            res.status(404).json(
                { message: "Username already taken" });
        }

    
    };

    app.get('/api/admin/users', getUsers);
    app.get("/api/admin/users/:univ", findUserByUniv);

    app.put("/api/admin/:adminId", updateAdmin);
    app.put("/api/admin/users/:userId", updateUser);

    app.post("/api/admin/users",createUser);
    app.post("/api/admin/users/signin", signin);
    app.post("/api/admin/users/signout", signout);
    app.post("/api/admin/users/account", account);
    app.post("/api/admin/users/:userId", findUserById);
    
    app.delete("/api/admin/users/:userId", deleteUser);
    app.delete("/api/admin/users/univ/:univ", deleteUniv);
    

}

export default AdminRoutes;
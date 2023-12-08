import * as dao from "./dao.js";



function DataRoutes(app, client) {

    function generateRandomNumbers(n, min, max) {
        let randomNumbers = [];
      
        for (let i = 0; i < n; i++) {
          let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          randomNumbers.push(randomNum);
        }
      
        return randomNumbers;
      }


    let currentUser = null;




    const getUsers =  async (req, res) => {

        const users = await dao.getUsers(client); 

        if(currentUser === null){

            let randomIDs = generateRandomNumbers(4, 1, 10);
            console.log("current user: "+ currentUser);
            const randUsers = users.filter(usr => randomIDs.includes(usr.id) );
            res.json(randUsers);

            
        }
        else{
            res.json(users);
        }



    }

    const signin = async (req, res) => {

        const { firstname, lastname } = req.body;
        const currentUsr = await dao.findUserByCredentials(client, firstname, lastname);
        currentUser = currentUsr;
        res.json(currentUser);
    
    };

    const signup = async (req, res) => {


        console.log("data while signup: "+ JSON.stringify(req.body))

        const user = await dao.findUserByUsername(client,req.body.username);
        console.log("insdie signup: "+ JSON.stringify(user[0]))

        if (user[0] === undefined) {

            const currentUsr = await dao.createUser(client, req.body);
            currentUser = currentUsr;
            res.status(200).json(currentUser);

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

        console.log("insdie univ: "+ JSON.stringify(user[0]))

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



            res.json({"message": "done"})
        

    
    };

    const findUserById = async (req, res) => {


        let { userId } = req.params;
        userId = parseInt(userId)
        const user = await dao.findUserById(client,userId);

        res.json(user)
        

    
    };

    const updateUser = async (req, res) => {


        let { userId } = req.params;
        userId = parseInt(userId)
        const user = await dao.updateUser(client,userId, req.body);

        res.json(user)
        

    
    };

    const signout = (req, res) => {

        currentUser = null;
        res.json(200);
        // req.session.destroy();
        // res.json(200);
       }; 

       const account = async (req, res) => { 

        res.json(currentUser);
        // res.json(req.session['currentUser']);
      };

    app.get('/api/users', getUsers);
    app.get("/api/users/:univ", findUserByUniv);
    app.put("/api/users/:userId", updateUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    app.post("/api/users/:userId", findUserById);
    app.delete("/api/users/:userId", deleteUser);
    

}

export default DataRoutes;
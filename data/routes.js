import * as dao from "./dao.js";


function DataRoutes(app, client) {



    let currentUser = null;

    const getUsers =  async (req, res) => {

        const users = await dao.getUsers(client); 
        res.json(users);
    }

    const signIn = async (req, res) => {

        const { firstname, lastname } = req.body;
        const currentUsr = await dao.findUserByCredentials(client, firstname, lastname);
        currentUser = currentUsr;
        res.json(currentUser);
    
    };

    app.get('/api/users', getUsers);
    app.post("/api/users/signin", signIn);

}

export default DataRoutes;
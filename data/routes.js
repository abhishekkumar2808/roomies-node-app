import * as dao from "./dao.js";
import axios from "axios";



function DataRoutes(app, client) {


    function generateRandomNumbers(n, min, max) {
        let randomNumbers = [];
      
        while(true){

          if(randomNumbers.length === n){
            break;
          }

          let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          if(randomNumbers.includes(randomNum)){
              continue;
          }else{
              randomNumbers.push(randomNum);
          }



        }
        console.log("rand number: ", randomNumbers)
        return randomNumbers;
      }




    const getUsers =  async (req, res) => {

      console.log("fetches all users")

        const users = await dao.getUsers(client); 
        console.log("session value: "+ req.session['currentUser'])

        if(req.session['currentUser'] === undefined){

            let randomIDs = generateRandomNumbers(4, 0, users.length-1);
       
            const randUsers = users.filter((usr, index) => randomIDs.includes(index) );

            console.log("size of the aray: ", randUsers.length)
            res.json(randUsers);

            
        }
        else{
            res.json(users);
        }



    }

    const signin = async (req, res) => {

        const { username, password } = req.body;
        const currentUsr = await dao.findUserByCredentials(client, username, password);
        
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
            console.log("current user signup: "+ JSON.stringify(currentUsr))
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
        console.log("findUserByUniv univ: "+ univ)
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
        const user = await dao.updateUser(client,userId, req.body);
        req.session['currentUser'] = user;
        res.json(user)
        

    
    };

    const signout = (req, res) => {


        req.session.destroy();
        res.json(200);
       }; 

    const account = async (req, res) => { 

        //res.json(currentUser);
        console.log(" in acct: "+ req.session['currentUser'])
        res.json(req.session['currentUser']);
      };

    const getUnivs = async (req, res) => {

        const univ = await dao.getUnivs(client);
        res.json(univ);
    }

    const getAllRestaurants = async (req, res) => {

        const {restaurant} = req.params;

        const response = await axios.get(
            `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${restaurant}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
              },
            }
          );
      
          // Extract relevant information from the response
        //   console.log("business: ", JSON.stringify(response.data.businesses))
          const restaurants = response.data.businesses.map((business) => {
            return {
              name: business.name,
              address: business.location.address1,
              rating: business.rating,
              image_url: business.image_url,
              review_count: business.review_count,
              phone: business.display_phone
            };
          });
      
          res.json(restaurants);

    }



    app.get('/api/users/', getUsers);
    app.get("/api/users/restaurants/:restaurant", getAllRestaurants)
    app.get("/api/users/:univ", findUserByUniv);
    app.put("/api/users/:userId", updateUser)
    app.post("/api/users/univ", getUnivs)
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    app.post("/api/users/:userId", findUserById);
    
    app.delete("/api/users/:userId", deleteUser);
    
 
}

export default DataRoutes;
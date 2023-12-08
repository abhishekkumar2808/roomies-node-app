
export const getUsers = async (client) =>{

    try {
        const query = 'SELECT * FROM users';
        const result = await client.query(query);

        // Display the retrieved data
        console.log('Retrieved rows:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving data:', error);
    } 

}

export const findUserByCredentials = async (client, firstname, lastname) => {

    try {
        const query = ` SELECT * FROM users WHERE firstname = $1 AND lastname = $2; `;
        const result = await client.query(query, [firstname, lastname]);

        // Display the retrieved data
        console.log('Retrieved rows of cred:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving credentials data:', error);
    } 
}

export const findUserByUsername = async (client, username) => {

    console.log("username: "+ username)

    try {
        const query = ` SELECT * FROM users WHERE username = $1`;
        const result = await client.query(query, [username]);

        // Display the retrieved data
        console.log('Retrieved rows of cred asd:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving credentials data:', error);
    } 
}

export const createUser = async(client, user) => {


    
    try {
                                               
        const query = ` INSERT INTO users (firstname, lastname, state, country, university, major, term, year, smoking, drinking, veg, age, shared, hobbies, degree, mail, languages, about, username, password, ug_univ, phone ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *`;
        const result = await client.query(query, [user.firstname, user.lastname, user.state, user.country, 
                                                  user.university, user.major, user.term, user.year, 
                                                  user.smoking, user.drinking, user.veg, user.age, user.shared, user.hobbies,
                                                  user.degree, user.mail, user.languages, user.about,
                                                  user.username, user.password, user.ug_univ, user.phone
                                                ]);
        

        // Display the retrieved data
        console.log('Retrieved rows of cred:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving credentials data:', error);
    } 

}


export const findUserByUniv = async(client, univ) => {


    
    try {
                                               
        const query = `SELECT * FROM  users WHERE university = $1`;
        const result = await client.query(query, [univ]);

        // Display the retrieved data
        console.log('Retrieved rows:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving data:', error);
    } 

}

export const deleteUserById = async(client, userId) => {


    
    try {
                                               
        const query = `DELETE FROM  users WHERE id = $1`;
        const result = await client.query(query, [userId]);

        // Display the retrieved data
        console.log('Retrieved rows:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving data:', error);
    } 

}

export const findUserById = async(client, userId) => {


    
    try {
                                               
        const query = `SELECT * FROM  users WHERE id = $1`;
        const result = await client.query(query, [userId]);

        // Display the retrieved data
        console.log('Retrieved rows:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving data:', error);
    }  

}

export const updateUser = async(client, userId, user) => {


    
    try {
                                               
        const query = ` UPDATE users SET    firstname = $2, lastname = $3, state = $4, country = $5, university = $6,
                                            major = $7, term = $8, year = $9, smoking = $10, drinking = $11,
                                            veg = $12, age = $13, shared = $14, hobbies = $15, degree = $16,
                                            mail = $17, languages = $18, about = $19, username = $20, password = $21,
                                            ug_univ = $22, phone = $23
                        WHERE id = $1`;
        const result = await client.query(query, 
                                                [
                                                    user.id, user.firstname, user.lastname, user.state, user.country, 
                                                    user.university, user.major, user.term, user.year, 
                                                    user.smoking, user.drinking, user.veg, user.age, user.shared, user.hobbies,
                                                    user.degree, user.mail, user.languages, user.about,
                                                    user.username, user.password, user.ug_univ, user.phone
                                                ]);

        // Display the retrieved data
        console.log('Retrieved rows:', result.rows);

        return result.rows;
    } 
    catch (error) {
        console.error('Error retrieving data:', error);
    } 

}
  
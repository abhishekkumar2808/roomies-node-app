
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
  
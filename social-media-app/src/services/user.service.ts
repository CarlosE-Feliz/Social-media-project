// interface User {
//     id: number;
//     username: string;
//     email: string;
//     fullname: string
//     createdAt: Date;
// }
// export const getUsers = async (): Promise<User[]> => {
//     try {
//         const response = await fetch('http://localhost:5000/api/users/getUsers');
//         if(!response.ok){
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         throw error;
//     }
// }
'use server'
 
export async function create() {
 

        const user = localStorage.getItem('user');
        if (!user) {
            console.error('User not found in local storage');
            return;
        }
        

        const parsedUser = JSON.parse(user);
        const userId = parsedUser.id;


        const response = await fetch('http://localhost:5000/user/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json(); 
}
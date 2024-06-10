import axiosInstance from "./axiosInterface";

export const character = {
    create: async (data) => {
        try {
            const response = await axiosInstance.post('/character', data);

            if (response.status === 200) {
                // CharCreate successful
                console.log('Character creation successful!');
            } else {
                console.log(response.status)
                // Registration failed
                console.error('Character creation. Please try again.')
            }

            return response;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    },
}
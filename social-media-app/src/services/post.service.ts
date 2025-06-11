interface PostData{
    content: string;
    userId: number
}

export const createPost = async(postData: PostData) =>{
    try {
        const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                caption: postData.content,
                userId: postData.userId
            }),
        });
        if(!response.ok){
            throw new Error('Failed to create the post');
        }

        return await response.json();
    } catch (error) {
      console.error('Error creating the post: ', error);
      throw error;  
    }
}; 
 
export async function postData<T, D = Record<string, unknown>>(url: string, data: D): Promise<T>{
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok){
      const error = await response.text();
      throw new Error (`Error ${response.status}: ${error}`);
    }

    return await response.json()
  }catch(error){
    console.error('POST Error: ', error);
    throw error;
  }
}
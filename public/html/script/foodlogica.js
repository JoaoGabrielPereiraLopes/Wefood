async function create_foods(){
    try{
        const result = await fetch('/get_comidas', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
        });

        alert(result)
    } catch (error){
        console.log('Error: ', error);
    }
}

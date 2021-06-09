const socket= io()

// socket.on('countupdated',(count)=>{
//     console.log('hello bruh',count)
// })

// document.querySelector("#mail").addEventListener('click',(e)=>{


// })
socket.on('messages',(message)=>{
    console.log(message)
})

document.querySelector("#message-form").addEventListener('submit',(e)=>{
    e.preventDefault()
   
    // const m= document.querySelector('input').value
    const m = e.target.elements.message.value
    // console.log(m)
    socket.emit('sendmessages',m,()=>{
        console.log('message is acknowledge')
    })
})

document.querySelector('#geolocation').addEventListener('click',()=>{
    if(!navigator.geolocation)return alert('not given')
    navigator.geolocation.getCurrentPosition((position)=>{
        const cord={
           lang: position.coords.longitude,
            lat:position.coords.latitude
        }
        socket.emit('geolocation',cord,()=>{
            console.log("shivanshu")
        });
 
    })
})





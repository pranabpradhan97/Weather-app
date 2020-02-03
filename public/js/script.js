//fetch is asynchronous
console.log("hello")
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     console.log(response.json())
// })


// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
        
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault()
    const location = search.value;
    document.getElementById('para1').textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.getElementById('para2').textContent = ''
                document.getElementById('para1').textContent = 'Enter a valid location'
            }
            else{
                document.getElementById('para1').textContent = ''
                document.getElementById('para2').textContent = 'Forecast: '+data.forecast + ' Location: ' + data.location
            }
                
        })
    })
})
const express = require('express')
const app = express()


let persons=[
    { 
        "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

app.use(express.json())

app.get('/info',(request, response)=>{
    let date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people <br/><br/>${date}</p>`)
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})


app.post('/api/persons',(request,response)=>{
    const {name,number}= request.body

    const isExist = persons.find(p=>p.name=== name)
    
    if(!name||!number){
        return response.status(400).json({error:'Name and Number are required'})
    }else if(isExist){
        return response.status(404).json({error:'Name must be unique'})
    }    

    const person = {
        name: name,
        number: number,
        id:generateId()
    }

    persons= persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id',(request,response)=>{
    let id = request.params.id
    let person = persons.find(p=>p.id===id)

    if(person){
        response.json(person)
    }
    response.status(404).end()
})


const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)

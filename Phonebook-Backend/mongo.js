const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = 
  `mongodb+srv://miou:${password}@cluster0.jck7t.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    const phoneBookSchema = new mongoose.Schema({
      name: String,
      phoneNumber: String,
    })

    const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

    if (process.argv.length === 3) {
      // Show all phone book entries
      console.log("Phonebook: ")
      PhoneBook.find({})
        .then(result => {
          result.forEach(person => {
            console.log(`${person.name} ${person.phoneNumber}`)
          })
          mongoose.connection.close()
        })
    } else if (process.argv.length === 5) {
      // Add new phone book entry
      const phoneBook = new PhoneBook({
        name: name,
        phoneNumber: phoneNumber,
      })
      
      phoneBook.save().then(result => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
      })
    }
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err)
  })

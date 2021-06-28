const router = require("express").Router()

const Book = require('./../models/Book.model')

const { checkLoggedUser, checkRoles } = require('./../middleware')


// Books list
router.get('/', (req, res) => {

    const isAdmin = req.session.currentUser?.role === 'ADMIN'

    Book
        .find()
        .select('title')
        .then(books => res.render('books/books-list', { books, isAdmin }))
        .catch(err => console.log(err))
})


// Book details
router.get('/detalles/:book_id', (req, res) => {

    const { book_id } = req.params

    const isAdmin = req.session.currentUser?.role === 'ADMIN'

    Book
        .findById(book_id)
        .then(book => res.render('books/book-details', { book, isAdmin }))
        .catch(err => console.log(err))
})


// New book form: render
router.get('/crear', checkLoggedUser, (req, res) => res.render('books/create-book'))

// New book form: manage
router.post('/crear', checkLoggedUser, (req, res) => {

    const { title, author, description, rating } = req.body

    Book
        .create({ title, author, description, rating })
        .then(() => res.redirect('/libros/listado'))
        .catch(err => console.log(err))
})




// Edit book form: render
router.get('/editar', checkLoggedUser, checkRoles('ADMIN'), (req, res) => {

    const { book_id } = req.query

    Book
        .findById(book_id)
        .then(theBook => res.render('books/edit-book', theBook))
        .catch(err => console.log(err))
})


// Edit book form: manage
router.post('/editar', checkLoggedUser, checkRoles('ADMIN'), (req, res) => {

    const { book_id } = req.query
    const { title, author, description, rating } = req.body

    Book
        .findByIdAndUpdate(book_id, { title, author, description, rating })
        .then(() => res.redirect('/libros/listado'))
        .catch(err => console.log(err))
})





module.exports = router
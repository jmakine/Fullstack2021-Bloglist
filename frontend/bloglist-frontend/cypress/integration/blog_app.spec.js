/*const blog = {
    title: 'title',
    author: 'author',
    url: 'www.testblogapp.fi'
}
const blogs = [
    {
    title: 'title1',
    author: 'author1',
    url: 'www.testblogapp1.fi'
    },
    {
    title: 'title2',
    author: 'author2',
    url: 'www.testblogapp2.fi'
    },
    {
    title: 'title3',
    author: 'author3',
    url: 'www.testblogapp3.fi'
    }
]*/


describe('Blog App', function() {

    beforeEach(function() { 
        cy.visit('http://localhost:3000')
    })    

    it('Front page can be opened', function() {
        cy.contains('Blog App')
    })
  
    it('Login form can be opened', function() {
        cy.contains('Log in').click()
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Cancel')
    })

    describe('Login',function() {
        beforeEach(function() {
            cy.contains('Log in').click()
        })

        it('Succeeds with correct credentials', function() {
            cy.get('#username').type('111')
            cy.get('#password').type('111')
            cy.get('#login-button').click()
            cy.contains('111 logged in')
        })
    
        it('Fails with wrong credentials', function() {
            cy.get('#username').type('111')
            cy.get('#password').type('222')
            cy.get('#login-button').click()
            cy.contains('Login')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
        cy.contains('Log in').click()
        cy.get('#username').type('111')
        cy.get('#password').type('111')
        cy.get('#login-button').click()
        })

        it('A blog can be added', function() {
            cy.contains('Add new blog').click()
            cy.get('#title').type('newTitle')
            cy.get('#author').type('newAuthor')
            cy.get('#url').type('newUrl')
            cy.get('#create-blog').click()
            cy.contains('newTitle')
            cy.contains('newAuthor')
        })
    })

  })
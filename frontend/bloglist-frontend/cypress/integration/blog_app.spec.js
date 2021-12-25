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
    /*beforeEach(function() {    
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  const user = {
      name: '111',
      username: '111',
      password: '111'
  }
  cy.request('POST', 'http://localhost:3001/api/users', user)
  cy.visit('http://localhost:3000')
})*/

    it('Front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Blog App')
    })
  
    it('Login form can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log in').click()
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Cancel')
    })


  })
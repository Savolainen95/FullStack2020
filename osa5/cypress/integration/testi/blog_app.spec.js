import { wait } from "@testing-library/react"



describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Mikko Savolainen',
            username: 'Savukka',
            password: 'fäcä'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

   it('front page can be opened', function () {
        cy.contains('Blogs')
        cy.contains('login')
    })

    it('login with correct user', function () {
        cy.get('#username').type('Savukka')
        cy.get('#password').type('fäcä')
        cy.get('#login-button').click()

        cy.contains('Savukka logged in')

    })
    it('login with bad user', function () {
        cy.get('#username').type('Ilmari')
        cy.get('#password').type('Saku')
        cy.get('#login-button').click()

        cy.contains('login')
        cy.contains('username')
        cy.contains('password')
    }) 
    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('Savukka')
            cy.get('#password').type('fäcä')
            cy.get('#login-button').click()
        })
        it('contains closed blog form', function () {
            cy.contains('create new blog')
        })
        it('form opens when clicked', function () {
            cy.get('#create-new-blog').click()

            cy.contains('title')
            cy.contains('author')
            cy.contains('url')
        })
        it('trying to create bad blog', function () {
            cy.get('#create-new-blog').click()
            cy.get('#create-blog').click()
            cy.get('.error').contains('wrong credentials')
        })

        it('like blog', function () {
            cy.get('#create-new-blog').click()

            cy.get('#title').type('Mikon hienot testit')
            cy.get('#author').type('Mikko Savolainen')
            cy.get('#url').type('http://www.sakuopikoodaamaan.fi')

            cy.get('#create-blog').click()

            cy.contains('Mikon hienot testit, Mikko Savolainen')

            cy.contains('view').click()

            cy.get('#like-blog').click()
        })

        it('delete blog', function () {
            cy.contains('create new blog').click()

            cy.get('#title').type('Tämä on poistettava blogi')
            cy.get('#author').type('Mikko Savolainen')
            cy.get('#url').type('http://www.ilmarikinvoisioppiakoodaa.fi')

            cy.get('#create-blog').click()

            cy.get('#view-blog').click()
            cy.get('#delete-blog').click()
        })

        describe('Many blogs', function () {
            beforeEach(function () {
                cy.get('#create-new-blog').click()

                cy.get('#title').type('Sakun vain testit')
                cy.get('#author').type('Saku Kosonen')
                cy.get('#url').type('http://www.sakuopikoodaamaan.fi')

                cy.get('#create-blog').click()
                cy.wait(1000)
                cy.get('#create-new-blog').click()

                cy.get('#title').type('Mikon hienot testit')
                cy.get('#author').type('Mikko Savolainen')
                cy.get('#url').type('http://www.mikkoosaakoodata.fi')

                cy.get('#create-blog').click()
            })

            it('liket järjestyksessä', function() {
                cy.wait(2000)
                cy.contains('Sakun vain testit, Saku Kosonen').contains('view').click()
                
                cy.contains('Mikon hienot testit, Mikko Savolainen').contains('view').click()

                cy.contains('Sakun vain testit, Saku Kosonen').parent().contains('like').click()

                cy.contains('Mikon hienot testit, Mikko Savolainen').parent().contains('like').click()
                cy.wait(2000)
                cy.contains('Mikon hienot testit, Mikko Savolainen').parent().contains('like').click()
                cy.wait(3000)
                cy.get('.formal').first().contains('Mikon hienot testit, Mikko Savolainen')
                
                
            })
        })
    })




})
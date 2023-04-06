/// <reference types = "Cypress"/>


describe('Bynder login scenario', () => {
    it('Does not do much!', () => {
        cy.visit('http://wave-trial.getbynder.com');
        cy.get('#inputEmail').type('qa-assignment');
        cy.get('#inputPassword').type('qa-Bynder2023!');
        cy.get("button[type='submit']").click();
        cy.get('.profile').should('include.text', 'QA role Assignment Efrain DLS');
        cy.get('.profile').click().get('.logout form button').click();
        cy.get('.cbox_messagebox').should('include.text', 'You have successfully logged out.');

        cy.get('#inputEmail').type('testingdemo12343');
        cy.get('#inputPassword').type('qa-Bynder2023!');
        cy.get("button[type='submit']").click();
        cy.get('.cbox_messagebox').should('have.text', 'You have entered an incorrect username or password.');

    })

    it('Get the rating of movie', () => {
        const base = 'https://api.themoviedb.org', key = '647b26240fa8e67fa6ad719cd591216b';
        cy.request({
            method: 'GET',
            url: `${base}/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
            form: true,
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.total_pages).to.eq(548);
            })
    })
    it('Update the movie ratings', () => {
        const base = 'https://api.themoviedb.org', key = '647b26240fa8e67fa6ad719cd591216b', movieId = 550;
        cy.request({
            method: 'POST',
            url: `${base}/3/movie/${movieId}/rating?api_key=${key}&language=en-US&page=1`,
            form: true,
            failOnStatusCode: false,
            body: {
                "value": 8.5
            },
        })
            .then((response) => {
                expect(response.status).to.eq(401);
                cy.log('the response is :- ' + response.body.success)
                expect(response.body.success).to.eq(false);
                expect(response.body.status_code).to.eq(3);
                expect(response.body.status_message).to.eq('Authentication failed: You do not have permissions to access the service.');
            })
    })

})
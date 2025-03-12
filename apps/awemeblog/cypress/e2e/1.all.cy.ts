describe('example to-do app', () => {
    // beforeEach(() => {
    //     // Cypress starts out with a blank slate for each test
    //     // so we must tell it to visit our website with the `cy.visit()` command.
    //     // Since we want to visit the same URL at the start of all our tests,
    //     // we include it in our beforeEach function so that it runs before each test
    //     cy.visit('https://example.cypress.io/todo')
    // })
    it('home page', () => {

        cy.visit('/')
            .get('body').should('contain', '基于 astro 部署的博客~~')
    })

    it('blog list page', () => {
        cy.visit('/blog')
            .get('body').should('contain', '2025再次开始')


    })
    it('blog first article', () => {
        cy.visit('/blog')
            .contains('2025再次开始').click()
        cy.visit('/blog/001hello')
            .get('body').should('contain', '2025再次开始')
            .get('body').should('contain', '基于 astro 部署的博客~~')
            .url().should('contain', '/blog/001hello')
    })
    it.skip('blog tools qrcode', () => {
        cy.visit('/tools/qrcode')
            .get('body').should('contain', '二维码生成')
            .get('textarea').should('be.visible').type('hello world')
            .get('canvas').should('exist')
    })
    it('blog tools typing exercises', () => {
        cy.visit('/tools/typing-exercises')
            .get('body').should('contain', 'typing-exercises-fe-with-angular')
            .get('app-speed-count').should('have.text', 'timeCount: ')
            .get('app-keyboard').should('exist')
            .contains('app-keyboard-item', 'Esc').should('exist')
            .get('body').type('q')
            .get('app-speed-count').should('contain.text', 'timeCount: ').should('not.have.text', 'timeCount: ')


    })
    it('blog tools busy-me', () => {
        cy.visit('/tools/busy-me')
            .get('body').should('contain', '我有拖延症!')
    })
})
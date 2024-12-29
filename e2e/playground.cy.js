describe('Cypress playground', () => {

  beforeEach('Visitando o site antes de cada caso de teste', () => {
    cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('Apresente um banner', () => {
    // Implemtentando o primeiro caso de teste
    cy.get('#promotional-banner').should('be.visible')
  })

  it('Click no botão subscribe e apresente a mensagem de sucesso', () => {
    cy.contains('button', 'Subscribe').click()
    cy.contains('#success', "You've been successfully subscribed to our newsletter.").should('be.visible')
  })

  it('Escrever meu nome no campo .type', () => {
    cy.get('#signature-textarea').type('Luiz')
    cy.contains('#signature', 'Luiz').should('be.visible')
  })
  
  it('Escrever meu nome e marca/desmarcar a caixa de seleção', () => {
    cy.get('#signature-textarea-with-checkbox').type('Luiz')
    cy.get('#signature-checkbox').check()
    cy.contains('#signature-triggered-by-check', 'Luiz').should('be.visible')

    cy.get('#signature-checkbox').uncheck()
    cy.contains('#signature-triggered-by-check', 'Luiz').should('not.exist')
  })

  it('Utilizando check/uncheck em tipo radio', () => {
    cy.contains('#on-off', 'ON').should('be.visible')
    
    cy.get('#on').check()

    cy.contains('#on-off', 'ON').should('be.visible')
    cy.contains('#on-off', 'OFF').should('not.exist')

    cy.get('#off').check()

    cy.contains('#on-off', 'OFF').should('be.visible')
    cy.contains('#on-off', 'ON').should('not.exist')
  })

  it('Utilizando o comando .select', () => {
    cy.contains('#select-selection', "You haven't selected a type yet.").should('be.visible')

    cy.get('#selection-type').select('Standard')
    cy.contains('#select-selection > strong', 'STANDARD').should('be.visible')

    cy.get('#selection-type').select('basic')
    cy.contains('#select-selection > strong', 'BASIC').should('be.visible')

    cy.get('#selection-type').select(3)
    cy.contains('#select-selection > strong', 'VIP').should('be.visible')
  })

  it('Utilizando o comando .select para diversos itens', () => {
    cy.contains('p', "You haven't selected any fruit yet.").should('be.visible')

    cy.get("#fruit").select(['apple','banana', 'cherry'])

    cy.contains('#fruits-paragraph', "You've selected the following fruits: apple, banana, cherry").should('be.visible')
  })
  it('Realizando um uploud de arquivo utilizando .selectFile', () => {
    cy.get('input[type="file"]').selectFile('./cypress/fixtures/example.json')
    cy.contains('#file', 'The following file has been selected for upload: example.json').should('be.visible')
  })

  it.only('Utilizando o comando intercept', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1').as('getTodo')

    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo').its('response.statusCode').should('be.equal', 200)

    cy.contains('li', 'TODO ID: 1').should('be.visible')
    cy.contains('li', 'User ID: 1').should('be.visible')
    cy.contains('li', 'Title: delectus aut autem').should('be.visible')
    cy.contains('li', 'Completed: false').should('be.visible')
  })
})
const localTest = false;
const WEB_DOMAIN_NAME = localTest ? "http://localhost:3000" : "https://kiri-app.herokuapp.com";
const COMPLETION_STATUS = ["Start", "End"];
const DAYS = ['Monday', "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];
const HOURS_TEST = ["12:00"];
const HOURS = ['0:00', "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
describe('KIRI history html dom end to end testing', () => {
    it('Check website succesfully  loaded ', () => {
        cy.visit(WEB_DOMAIN_NAME)
        cy.get('h1').should('have.text', "KIRI");
    })
    it('Check  start/finish html already exist or already loaded', () => {
        cy.get('#start-finish').select(COMPLETION_STATUS[0]).should('have.value', 'start');
        cy.get('#start-finish').select(COMPLETION_STATUS[1]).should('have.value', 'end');
    })
    it('Check  days  html already exist or already loaded', () => {
        let expectedValue = ['0', "1", "2", "3", "4", "5", "6"];
        cy.get('#day')
            .select(DAYS)
            .invoke('val')
            .should('deep.equal', expectedValue)
    })
    it('Check  time html dom already exist or already loaded', () => {
        let expectedValue = ['0', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
        cy.get('#hour')
            .select(HOURS)
            .invoke('val')
            .should('deep.equal', expectedValue)
    })
    it('Check  visualization mode  html dom already exist or already loaded', () => {
        cy.get('#marker-cluster').check();
        cy.get('#heat-map').click().check();
    })
})


COMPLETION_STATUS.forEach(status => {
    DAYS.forEach(day => {
        HOURS_TEST.forEach(hour => {
            describe('Functional Testing  check with visual regression', () => {
                it(`Test for marker cluster functional  in status ${status},day ${day},and time ${hour}`, () => {
                    cy.get('#marker-cluster').click();
                    cy.get('#start-finish').select(status).get("#day").select(day);
                    cy.get("#hour").select(hour).get("#send-btn").click().get("#map").notMatchImageSnapshot();

                    cy.get('#start-finish').select(status).get("#day").select(day);
                    cy.get("#hour").select(hour).get("#send-btn").click().get("#map").wait(2000).notMatchImageSnapshot();

                })
            })
        })
    })
})
//Check Heat Map
COMPLETION_STATUS.forEach(status => {
    DAYS.forEach(day => {
        HOURS_TEST.forEach(hour => {
            describe('Functional Testing  check with visual regression ', () => {
                it(`Test for heat map in status ${status},day ${day},and time ${hour}`, () => {
                    cy.get('#heat-map').click().get('#start-finish').select(status).get("#day").select(day);
                    cy.get("#hour").select(hour).get("#send-btn").click().get("#map").notMatchImageSnapshot();

                    cy.get('#start-finish').select(status).get("#day").select(day);
                    cy.get("#hour").select(hour).get("#send-btn").click().get("#map").wait(2000).notMatchImageSnapshot();

                })
            })
        })
    })
})

COMPLETION_STATUS.forEach(status => {
    DAYS.forEach(day => {
        HOURS_TEST.forEach(hour => {
            describe("Functional Testing  check with http request status", () => {
                it(`Test for marker cluster in status ${status},day ${day},and time ${hour}`, () => {
                    cy.get('#marker-cluster').click();
                    cy.get('#start-finish').select(status).get("#day").select(day);
                    cy.get("#hour").select(hour).get("#send-btn").click().request('POST', '/searchRoute').then(res =>
                        expect(res.status).to.eq(200)
                    );
                })
            });
        })
    })
})
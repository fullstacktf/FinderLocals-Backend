const controller = require('../controller');

function sum(a, b) {
    return a + b;
}

describe('Locals_Controller', () => {

    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    }),
        test('Debe devolver objeto local, al meter una ID', () => {
            const newLocal = { name: "carlota", location: "Calle Galcerán" }
            const respondLocal = { name: "carlota", location: "Calle Galcerán", id: 3 }
            expect(controller.createLocals(newLocal)).toStrictEqual(respondLocal);
        })
})


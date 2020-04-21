import { loadTrips } from './trips';

describe('Test loadTrips function', () => {
    it('expects to return an empty array', () => {
        loadTrips().then((trips) => {
            expect(trips).toEqual([]);
        });
    });
});
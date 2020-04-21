import { getTrips } from './tripsHelper';

describe('Test getTrips function', () => {
    it('expects to return an empty array', () => {
        const trips = getTrips();
        expect(trips).toEqual([]);
    });
});
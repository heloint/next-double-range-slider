import { fetchRangeData, RangeData } from './path-to-your-file'; // Adjust the path
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const mockData: RangeData = {
    maxLimit: 100,
    minLimit: 0,
    defaultMaxValue: 90,
    defaultMinValue: 10,
};

// Mock the server using msw
const server = setupServer(
    rest.get('http://localhost:3000/api/range-values/random', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
    })
);

// Enable and close the mock server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchRangeData', () => {
    it('should fetch and return range data successfully', async () => {
        const data = await fetchRangeData();

        // Verify the response data
        expect(data).toEqual(mockData);
    });

    it('should return null when fetch fails', async () => {
        // Mock a failed fetch response (e.g., 500 server error)
        server.use(
            rest.get('http://localhost:3000/api/range-values/random', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const data = await fetchRangeData();

        // Verify the return value is null when there is an error
        expect(data).toBeNull();
    });

    it('should return null when there is a network error', async () => {
        // Mock a network error
        server.use(
            rest.get('http://localhost:3000/api/range-values/random', (req, res, ctx) => {
                return res(ctx.status(0), ctx.delay(100)); // Network error scenario
            })
        );

        const data = await fetchRangeData();

        // Verify the return value is null when a network error occurs
        expect(data).toBeNull();
    });
});

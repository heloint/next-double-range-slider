import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchRangeData } from '../_lib/api-calls';

const mockData = {
    maxLimit: 100,
    minLimit: 0,
    defaultMaxValue: 90,
    defaultMinValue: 10,
};

// Mock the server using msw
const server = setupServer(
    http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/range-values/random`, () => {
        return HttpResponse.json(mockData, {status: 200});
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
            http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/range-values/random`, () => {
                return HttpResponse.json({}, {status: 500});
            })
        );

        const data = await fetchRangeData();

        // Verify the return value is null when there is an error
        expect(data).toBeNull();
    });

    it('should return null when there is a network error', async () => {
        // Mock a network error
        server.use(
            http.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/range-values/random`, async () => {
                await delay(100);
                return HttpResponse.json(null, {status: 200});
            })
        );

        const data = await fetchRangeData();

        // Verify the return value is null when a network error occurs
        expect(data).toBeNull();
    });
});

export function getNearestIndex(value: number, array: number[]): number {
    return array.reduce(
        (nearestIndex, currentValue, currentIndex) =>
            Math.abs(currentValue - value) <
            Math.abs(array[nearestIndex] - value)
                ? currentIndex
                : nearestIndex,
        0
    );
}

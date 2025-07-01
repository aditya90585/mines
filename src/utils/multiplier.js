export function calculateSpribeMultiplier(clicks, mines, total = 25) {
    if (clicks === 0) return 1.0;

    const firstClickMap = {
        1: 1.01, 2: 1.05, 3: 1.10, 4: 1.15, 5: 1.21,
        6: 1.27, 7: 1.34, 8: 1.42, 9: 1.51, 10: 1.61,
        11: 1.73, 12: 1.86, 13: 2.02, 14: 2.20, 15: 2.42,
        16: 2.69, 17: 3.03, 18: 3.46, 19: 4.04, 20: 4.85
    };

    if (clicks === 1 && firstClickMap[mines]) {
        return firstClickMap[mines];
    }

    const houseEdge = 0.038; // Tuned to match Spribe multipliers
    let prob = 1;
    for (let i = 0; i < clicks; i++) {
        prob *= (total - mines - i) / (total - i);
    }

    const multiplier = (1 - houseEdge) / prob;
    return Number(multiplier.toFixed(2));
}
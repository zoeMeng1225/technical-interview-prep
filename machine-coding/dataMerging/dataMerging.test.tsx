import { describe, it, expect } from 'vitest';
import mergeData from '.';

describe('mergeData', () => {
    // Test 1: Verify basic functionality with multiple users and duplicates
  it('should merge sessions for the same user and sort equipment', () => {
    // 1. Arrange (Define input)
    const sessions = [
      { user: 8, duration: 50, equipment: ['bench'] },
      { user: 7, duration: 150, equipment: ['dumbbell'] },
      { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
    ];

    // 2. Act (Run the function)
    const result = mergeData(sessions);

    // 3. Assert (Check results)
    expect(result).toEqual([
      { user: 8, duration: 50, equipment: ['bench'] },
      { 
        user: 7, 
        duration: 250, // 150 + 100
        equipment: ['bike', 'dumbbell', 'kettlebell'] // Sorted alphabetically
      },
    ]);
  });

  // Test 2: Verify that equipment is deduplicated (removed duplicates)
  it('should remove duplicate equipment', () => {
    const sessions = [
      { user: 1, duration: 10, equipment: ['bike'] },
      { user: 1, duration: 20, equipment: ['bike', 'bench'] }, // 'bike' is repeated
    ];

    const result = mergeData(sessions);

    expect(result[0].equipment).toEqual(['bench', 'bike']); // 'bike' should appear only once
  });

  // Test 3: Verify order preservation (First seen user remains first)
  it('should preserve the order of first appearance', () => {
    const sessions = [
      { user: 2, duration: 10, equipment: [] }, // User 2 appears first
      { user: 1, duration: 10, equipment: [] }, // User 1 appears second
      { user: 2, duration: 50, equipment: [] }, // User 2 appears again
    ];

    const result = mergeData(sessions);

    expect(result[0].user).toBe(2); // User 2 should still be at index 0
    expect(result[1].user).toBe(1);
  });
})
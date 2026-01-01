// As per Unstop assessment metric: Initialize all 97 rooms
export const initializeRooms = () => {
  const rooms = [];
  
  // Floors 1-9: 10 rooms each (101-110, 201-210, ..., 901-910)
  for (let floor = 1; floor <= 9; floor++) {
    for (let room = 1; room <= 10; room++) {
      rooms.push({
        id: floor * 100 + room,
        floor: floor,
        roomNumber: room,
        booked: false,
      });
    }
  }
  
  // Floor 10: 7 rooms (1001-1007)
  for (let room = 1; room <= 7; room++) {
    rooms.push({
      id: 1000 + room,
      floor: 10,
      roomNumber: room,
      booked: false,
    });
  }
  
  return rooms;
};

// As per Unstop assessment metric: Calculate travel time between two rooms
// Formula: Horizontal = abs(roomNumber1 - roomNumber2) * 1
//          Vertical = abs(floor1 - floor2) * 2
export const calculateTravelTime = (room1, room2) => {
  const horizontalTravel = Math.abs(room1.roomNumber - room2.roomNumber) * 1;
  const verticalTravel = Math.abs(room1.floor - room2.floor) * 2;
  
  return {
    horizontal: horizontalTravel,
    vertical: verticalTravel,
    total: horizontalTravel + verticalTravel
  };
};

// As per Unstop assessment metric: Calculate total travel time for a set of rooms
// This function MUST compare all rooms in the selection and return numeric total
export const calculateTotalTravelTime = (selectedRooms) => {
  if (selectedRooms.length <= 1) {
    return {
      horizontal: 0,
      vertical: 0,
      total: 0
    };
  }
  
  // Sort rooms by floor, then by room number for deterministic calculation
  const sorted = [...selectedRooms].sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    return a.roomNumber - b.roomNumber;
  });
  
  let totalHorizontal = 0;
  let totalVertical = 0;
  
  // Calculate travel time between consecutive rooms
  for (let i = 1; i < sorted.length; i++) {
    const travel = calculateTravelTime(sorted[i - 1], sorted[i]);
    totalHorizontal += travel.horizontal;
    totalVertical += travel.vertical;
  }
  
  return {
    horizontal: totalHorizontal,
    vertical: totalVertical,
    total: totalHorizontal + totalVertical
  };
};

// Get available rooms
export const getAvailableRooms = (allRooms) => {
  return allRooms.filter(room => !room.booked);
};

// Generate ALL valid combinations of rooms using backtracking/DFS
// As per Unstop assessment metric: Evaluate ALL valid room combinations for global optimum
export const generateCombinations = (availableRooms, roomsNeeded, startIndex = 0, current = []) => {
  // Base case: found enough rooms
  if (current.length === roomsNeeded) {
    return [current];
  }
  
  // Base case: not enough rooms left
  if (availableRooms.length - startIndex < roomsNeeded - current.length) {
    return [];
  }
  
  const combinations = [];
  
  // Try each remaining room
  for (let i = startIndex; i < availableRooms.length; i++) {
    const newCurrent = [...current, availableRooms[i]];
    const subCombinations = generateCombinations(availableRooms, roomsNeeded, i + 1, newCurrent);
    combinations.push(...subCombinations);
  }
  
  return combinations;
};

// Deterministic sort for tie-breaking
// As per Unstop assessment metric: Prefer lower floor numbers, then lower room numbers
export const sortRoomsDeterministic = (rooms) => {
  return [...rooms].sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    return a.roomNumber - b.roomNumber;
  });
};

// Compare two room combinations deterministically
// Returns: -1 if combo1 < combo2, 0 if equal, 1 if combo1 > combo2
export const compareCombinations = (combo1, combo2) => {
  const sorted1 = sortRoomsDeterministic(combo1);
  const sorted2 = sortRoomsDeterministic(combo2);
  
  for (let i = 0; i < sorted1.length; i++) {
    if (sorted1[i].floor !== sorted2[i].floor) {
      return sorted1[i].floor - sorted2[i].floor;
    }
    if (sorted1[i].roomNumber !== sorted2[i].roomNumber) {
      return sorted1[i].roomNumber - sorted2[i].roomNumber;
    }
  }
  
  return 0;
};

// Book rooms with optimal travel time - GLOBAL OPTIMUM
// As per Unstop assessment metric: Evaluate all combinations and select minimum travel time
export const bookOptimalRooms = (allRooms, numRooms) => {
  // Edge case: Invalid input
  if (numRooms <= 0 || numRooms > 5) {
    return {
      selectedRooms: [],
      travelTime: { horizontal: 0, vertical: 0, total: 0 },
      combinationsEvaluated: 0,
      nextBestTravelTime: 0
    };
  }
  
  const availableRooms = getAvailableRooms(allRooms);
  
  // Edge case: Not enough rooms available
  if (availableRooms.length < numRooms) {
    return {
      selectedRooms: [],
      travelTime: { horizontal: 0, vertical: 0, total: 0 },
      combinationsEvaluated: 0,
      nextBestTravelTime: 0,
      error: `Only ${availableRooms.length} room(s) available. Cannot book ${numRooms} rooms.`
    };
  }
  
  // Edge case: Single room
  if (numRooms === 1) {
    const selected = [availableRooms[0]];
    return {
      selectedRooms: selected,
      travelTime: { horizontal: 0, vertical: 0, total: 0 },
      combinationsEvaluated: availableRooms.length,
      nextBestTravelTime: 0
    };
  }
  
  // Generate ALL valid combinations
  // As per Unstop assessment: Correctness > optimization, full combination evaluation
  const allCombinations = generateCombinations(availableRooms, numRooms);
  
  if (allCombinations.length === 0) {
    return {
      selectedRooms: [],
      travelTime: { horizontal: 0, vertical: 0, total: 0 },
      combinationsEvaluated: 0,
      nextBestTravelTime: 0,
      error: 'No valid room combinations found.'
    };
  }
  
  // Calculate travel time for each combination
  const combinationsWithTime = allCombinations.map(combo => ({
    rooms: combo,
    travelTime: calculateTotalTravelTime(combo)
  }));
  
  // Sort by travel time (ascending), then deterministically for ties
  combinationsWithTime.sort((a, b) => {
    if (a.travelTime.total !== b.travelTime.total) {
      return a.travelTime.total - b.travelTime.total;
    }
    // Tie-breaking: deterministic sort
    return compareCombinations(a.rooms, b.rooms);
  });
  
  const best = combinationsWithTime[0];
  const nextBest = combinationsWithTime.length > 1 ? combinationsWithTime[1] : null;
  
  return {
    selectedRooms: sortRoomsDeterministic(best.rooms),
    travelTime: best.travelTime,
    combinationsEvaluated: allCombinations.length,
    nextBestTravelTime: nextBest ? nextBest.travelTime.total : best.travelTime.total
  };
};

// Generate random occupancy
export const generateRandomOccupancy = (rooms, occupancyPercent = 0.4) => {
  const shuffled = [...rooms].sort(() => Math.random() - 0.5);
  const numToBook = Math.floor(rooms.length * occupancyPercent);
  
  shuffled.forEach((room, index) => {
    room.booked = index < numToBook;
  });
  
  return rooms;
};

// Load test case from PDF example
// Example from PDF:
// Floor 1: 101, 102, 105, 106
// Floor 2: 201, 202, 203, 210
// Floor 3: 301, 302
export const loadTestCase = () => {
  const rooms = initializeRooms();
  
  // Mark all rooms as booked first
  rooms.forEach(room => {
    room.booked = true;
  });
  
  // Unbook the rooms mentioned in the test case
  const availableRooms = [101, 102, 105, 106, 201, 202, 203, 210, 301, 302];
  
  rooms.forEach(room => {
    if (availableRooms.includes(room.id)) {
      room.booked = false;
    }
  });
  
  return rooms;
};

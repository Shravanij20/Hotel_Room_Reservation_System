// Initialize all 97 rooms
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

// Calculate travel time between two rooms
export const calculateTravelTime = (room1, room2) => {
  const floorDiff = Math.abs(room1.floor - room2.floor);
  const roomDiff = Math.abs(room1.roomNumber - room2.roomNumber);
  
  const verticalTime = floorDiff * 2; // 2 minutes per floor
  const horizontalTime = roomDiff * 1; // 1 minute per room
  
  return verticalTime + horizontalTime;
};

// Calculate total travel time for a set of rooms
export const calculateTotalTravelTime = (rooms) => {
  if (rooms.length <= 1) return 0;
  
  // Sort rooms by floor, then by room number
  const sorted = [...rooms].sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    return a.roomNumber - b.roomNumber;
  });
  
  let totalTime = 0;
  for (let i = 1; i < sorted.length; i++) {
    totalTime += calculateTravelTime(sorted[i - 1], sorted[i]);
  }
  
  return totalTime;
};

// Get available rooms by floor
export const getAvailableRoomsByFloor = (rooms) => {
  const byFloor = {};
  rooms.forEach(room => {
    if (!room.booked) {
      if (!byFloor[room.floor]) {
        byFloor[room.floor] = [];
      }
      byFloor[room.floor].push(room);
    }
  });
  
  // Sort rooms on each floor by room number
  Object.keys(byFloor).forEach(floor => {
    byFloor[floor].sort((a, b) => a.roomNumber - b.roomNumber);
  });
  
  return byFloor;
};

// Find consecutive rooms on a floor
export const findConsecutiveRooms = (floorRooms, count) => {
  const combinations = [];
  
  for (let i = 0; i <= floorRooms.length - count; i++) {
    const group = floorRooms.slice(i, i + count);
    combinations.push(group);
  }
  
  return combinations;
};

// Book rooms with optimal travel time
export const bookOptimalRooms = (allRooms, numRooms) => {
  if (numRooms > 5) {
    alert('Maximum 5 rooms can be booked at a time!');
    return [];
  }
  
  const availableByFloor = getAvailableRoomsByFloor(allRooms);
  const floors = Object.keys(availableByFloor).map(f => parseInt(f)).sort((a, b) => a - b);
  
  // Priority 1: Try to find all rooms on the same floor
  for (const floor of floors) {
    const floorRooms = availableByFloor[floor];
    if (floorRooms.length >= numRooms) {
      // Try to find consecutive rooms first (lowest travel time)
      const consecutiveGroups = findConsecutiveRooms(floorRooms, numRooms);
      if (consecutiveGroups.length > 0) {
        return consecutiveGroups[0]; // Return first consecutive group
      }
      
      // If no consecutive rooms, return first N rooms (they're already sorted)
      return floorRooms.slice(0, numRooms);
    }
  }
  
  // Priority 2: If not enough on same floor, minimize travel time across floors
  // Use a smarter approach: try to group rooms by floor clusters
  const candidates = [];
  
  // Generate combinations more efficiently
  // Try starting from each floor and building the best combination
  for (const startFloor of floors) {
    const startRooms = availableByFloor[startFloor];
    if (startRooms.length === 0) continue;
    
    // Try each room on this floor as a starting point
    for (const startRoom of startRooms) {
      const selected = [startRoom];
      const usedRooms = new Set([startRoom.id]);
      
      // Greedily add rooms that minimize travel time
      while (selected.length < numRooms) {
        let bestNextRoom = null;
        let minAddedTime = Infinity;
        
        // Try all remaining available rooms
        for (const floor of floors) {
          const floorRooms = availableByFloor[floor];
          for (const room of floorRooms) {
            if (usedRooms.has(room.id)) continue;
            
            // Calculate travel time if we add this room
            // Try inserting it in the best position
            let minInsertTime = Infinity;
            
            // Try inserting at the beginning
            const timeAtStart = calculateTravelTime(room, selected[0]);
            minInsertTime = Math.min(minInsertTime, timeAtStart);
            
            // Try inserting at the end
            const timeAtEnd = calculateTravelTime(selected[selected.length - 1], room);
            minInsertTime = Math.min(minInsertTime, timeAtEnd);
            
            // Try inserting in the middle (between consecutive rooms)
            for (let i = 0; i < selected.length - 1; i++) {
              const prevTime = calculateTravelTime(selected[i], room);
              const nextTime = calculateTravelTime(room, selected[i + 1]);
              const currentTime = calculateTravelTime(selected[i], selected[i + 1]);
              const addedTime = prevTime + nextTime - currentTime;
              minInsertTime = Math.min(minInsertTime, addedTime);
            }
            
            if (minInsertTime < minAddedTime) {
              minAddedTime = minInsertTime;
              bestNextRoom = room;
            }
          }
        }
        
        if (bestNextRoom) {
          // Insert the room in the optimal position
          let bestPosition = 0;
          let minTotalTime = Infinity;
          
          // Try all positions
          for (let pos = 0; pos <= selected.length; pos++) {
            const testSelection = [...selected];
            testSelection.splice(pos, 0, bestNextRoom);
            const totalTime = calculateTotalTravelTime(testSelection);
            if (totalTime < minTotalTime) {
              minTotalTime = totalTime;
              bestPosition = pos;
            }
          }
          
          selected.splice(bestPosition, 0, bestNextRoom);
          usedRooms.add(bestNextRoom.id);
        } else {
          break; // No more rooms available
        }
      }
      
      if (selected.length === numRooms) {
        candidates.push(selected);
      }
    }
    
    // Limit search to avoid performance issues
    if (candidates.length > 50) break;
  }
  
  if (candidates.length === 0) {
    return [];
  }
  
  // Find the combination with minimum travel time
  let bestCombination = candidates[0];
  let minTravelTime = calculateTotalTravelTime(bestCombination);
  
  for (const candidate of candidates) {
    const travelTime = calculateTotalTravelTime(candidate);
    if (travelTime < minTravelTime) {
      minTravelTime = travelTime;
      bestCombination = candidate;
    }
  }
  
  return bestCombination;
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


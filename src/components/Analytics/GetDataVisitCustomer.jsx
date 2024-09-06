// utils/getWeekData.js
import { visitData } from "./visitData";// Ensure this path is correct

export const getWeekData = (weekNumber) => {
    // Calculate indices for weeks up to weekNumber
    const startIndex = 0; // Start from the beginning
    const endIndex = weekNumber * 7; // End at the end of the weekNumber
  
    // Slice visitData to include all weeks up to weekNumber
    const weekData = visitData.slice(startIndex, endIndex);
  
    // Aggregate data for one-time visits and multi-time visits
    const oneTimeVisitCounts = weekData.map(day => day.oneTimeVisit.count);
    const multiTimeVisitCounts = weekData.map(day => day.multiTimeVisit.count);
  
    return {
      oneTimeVisit: {
        categories: weekData.map(day => new Date(day.date).toLocaleDateString()),
        data: oneTimeVisitCounts
      },
      multiTimeVisit: {
        categories: weekData.map(day => new Date(day.date).toLocaleDateString()),
        data: multiTimeVisitCounts
      }
    };
  };

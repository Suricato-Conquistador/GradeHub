export const formatDateString = (isoString: string): string => {
    const [datePart] = isoString.split("T"); // "2025-06-16"
    const [year, month, day] = datePart.split("-"); // ["2025", "06", "16"]
  
    return `${day}/${month}/${year}`; // "16/06/2025"
  };
export interface UserPreferenceTable {
    id: number;
    studentId: number;
    preferenceId: number;
    status: boolean;
    date: Date;
    updatedAt: string; // Added the missing property
};
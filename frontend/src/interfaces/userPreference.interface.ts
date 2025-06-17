export interface UserPreferenceTable {
    preference: string;
    approved: Date;
    rejected: Date;
    userId: number;
    status: boolean;
};
export interface GradeTableStudent {
    subject: string;
    grade: number;
    teacher: string;
};

export interface GradeTableTeacher {
  id: number,
  ra: string;
  name: string;
  grade: string | number;
};

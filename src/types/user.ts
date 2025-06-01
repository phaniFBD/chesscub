export enum Role {
  STUDENT = 'student',
  PARENT = 'parent',
  COACH = 'coach',
  ADMIN = 'admin'
}

export interface Progress {
  tactics: number;
  strategy: number;
  endgames: number;
  overall: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  role: Role.STUDENT;
  age: number;
  avatarUrl: string;
  level: 'Pawn' | 'Knight' | 'Bishop' | 'Queen';
  progress: Progress;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  role: Role.PARENT;
  children: string[];
}

export interface Coach {
  id: string;
  name: string;
  email: string;
  role: Role.COACH;
  students: string[];
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: Role.ADMIN;
}

export type User = Student | Parent | Coach | Admin;
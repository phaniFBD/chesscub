import { Module } from '../types/curriculum';

export const modules: Module[] = [
  {
    id: 'pawn-tactics',
    title: 'Basic Tactics',
    description: 'Learn fundamental tactical patterns that every chess player should know.',
    level: 'Pawn',
    category: 'tactics',
    lessons: [
      {
        id: 'pawn-tactics-1',
        title: 'Introduction to Tactics',
        description: 'Understanding what tactics are and why they matter.',
        durationMinutes: 10,
        ageRange: 'all',
        orderIndex: 1
      },
      {
        id: 'pawn-tactics-2',
        title: 'Forks with Knights',
        description: 'Learn how knights can attack two pieces at once.',
        videoUrl: 'https://example.com/knight-forks',
        durationMinutes: 15,
        ageRange: 'all',
        orderIndex: 2
      },
      {
        id: 'pawn-tactics-3',
        title: 'Pins and Skewers',
        description: 'Learn how to pin and skewer enemy pieces.',
        durationMinutes: 12,
        ageRange: 'all',
        orderIndex: 3
      }
    ],
    puzzles: [
      {
        id: 'puzzle-fork-1',
        title: 'Knight Fork Challenge',
        description: 'Find the knight fork in this position!',
        fen: 'r3k2r/pp2ppbp/2p3p1/3pPb2/3P4/2N2N2/PPP2PPP/R3K2R w KQkq - 0 1',
        solution: ['Nd5'],
        difficulty: 2,
        type: 'fork',
        ageRange: 'all'
      },
      {
        id: 'puzzle-pin-1',
        title: 'Pin Practice',
        description: 'Use a pin to win material.',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
        difficulty: 3,
        type: 'pin',
        ageRange: 'all'
      }
    ],
    quizzes: [
      {
        id: 'quiz-tactics-1',
        title: 'Tactics Quiz',
        questions: [
          {
            id: 'q1',
            text: 'What is a knight fork?',
            options: [
              'When a knight attacks the king and queen simultaneously',
              'When a knight attacks any two pieces simultaneously',
              'When a knight is captured',
              'When a knight moves in an L-shape'
            ],
            correctOptionIndex: 1,
            explanation: 'A knight fork is when a knight attacks any two or more pieces simultaneously.'
          },
          {
            id: 'q2',
            text: 'What is the difference between a pin and a skewer?',
            options: [
              'There is no difference',
              'Pins involve pawns, skewers involve pieces',
              'In a pin, the less valuable piece is in front; in a skewer, the more valuable piece is in front',
              'Pins are horizontal, skewers are vertical'
            ],
            correctOptionIndex: 2,
            explanation: 'In a pin, the less valuable piece is in front and cannot move because it would expose a more valuable piece. In a skewer, the more valuable piece is in front and is forced to move, allowing the capture of a less valuable piece behind it.'
          }
        ],
        timeLimit: 5,
        passingScore: 70,
        ageRange: 'all'
      }
    ],
    badge: {
      name: 'Tactics Apprentice',
      imageUrl: '/assets/badges/tactics-apprentice.png',
      description: 'Awarded for mastering basic tactical patterns'
    }
  },
  {
    id: 'pawn-endgames',
    title: 'Basic Endgames',
    description: 'Master the essential endgame techniques that will help you convert advantages into wins.',
    level: 'Pawn',
    category: 'endgames',
    lessons: [
      {
        id: 'pawn-endgames-1',
        title: 'King and Pawn Endgames',
        description: 'Learn the fundamentals of king and pawn endgames.',
        durationMinutes: 15,
        ageRange: 'all',
        orderIndex: 1
      },
      {
        id: 'pawn-endgames-2',
        title: 'Opposition Concept',
        description: 'Understanding the crucial concept of opposition in endgames.',
        videoUrl: 'https://example.com/opposition',
        durationMinutes: 12,
        ageRange: 'all',
        orderIndex: 2
      }
    ],
    puzzles: [
      {
        id: 'puzzle-endgame-1',
        title: 'King and Pawn Breakthrough',
        description: 'Find the winning pawn breakthrough!',
        fen: '8/8/8/8/2k2p2/5K2/8/8 w - - 0 1',
        solution: ['Ke2', 'Kd4', 'Kf3'],
        difficulty: 3,
        type: 'endgame',
        ageRange: 'all'
      }
    ],
    quizzes: [
      {
        id: 'quiz-endgames-1',
        title: 'Endgame Principles Quiz',
        questions: [
          {
            id: 'q1',
            text: 'What is "the opposition" in a king and pawn endgame?',
            options: [
              'When kings are directly facing each other with one square in between',
              'When one king blocks another king',
              'When a king blocks a pawn',
              'When pawns are opposing each other'
            ],
            correctOptionIndex: 0,
            explanation: 'The opposition is when kings face each other directly with one square in between. The player not having to move often has the advantage.'
          }
        ],
        timeLimit: 5,
        passingScore: 70,
        ageRange: 'all'
      }
    ],
    badge: {
      name: 'Endgame Explorer',
      imageUrl: '/assets/badges/endgame-explorer.png',
      description: 'Awarded for mastering basic endgame techniques'
    }
  },
  {
    id: 'knight-tactics',
    title: 'Intermediate Tactics',
    description: 'Advance your tactical vision with more complex patterns and combinations.',
    level: 'Knight',
    category: 'tactics',
    lessons: [
      {
        id: 'knight-tactics-1',
        title: 'Double Attacks',
        description: 'Learn how to attack multiple pieces at once.',
        durationMinutes: 15,
        ageRange: 'all',
        orderIndex: 1
      },
      {
        id: 'knight-tactics-2',
        title: 'Discovered Attacks',
        description: 'Master the powerful discovered attack tactic.',
        videoUrl: 'https://example.com/discovered-attacks',
        durationMinutes: 18,
        ageRange: 'all',
        orderIndex: 2
      }
    ],
    puzzles: [
      {
        id: 'puzzle-discovered-1',
        title: 'Discovered Attack Challenge',
        description: 'Find the devastating discovered attack!',
        fen: 'r1bqk2r/ppp2ppp/2n5/3np3/2BP4/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 1',
        solution: ['Bxf7+', 'Kxf7', 'Ng5+', 'Kg8', 'Ne6'],
        difficulty: 4,
        type: 'discovery',
        ageRange: 'all'
      }
    ],
    quizzes: [
      {
        id: 'quiz-intermediate-1',
        title: 'Intermediate Tactics Quiz',
        questions: [
          {
            id: 'q1',
            text: 'What is a discovered attack?',
            options: [
              'When you find a hidden attack your opponent made',
              'When you move one piece to reveal an attack from another piece behind it',
              'When you attack an opponent\'s piece that was hidden',
              'When you discover a new attacking pattern'
            ],
            correctOptionIndex: 1,
            explanation: 'A discovered attack occurs when one piece moves out of the way, revealing an attack from another piece that was behind it.'
          }
        ],
        timeLimit: 5,
        passingScore: 70,
        ageRange: 'all'
      }
    ],
    badge: {
      name: 'Tactical Warrior',
      imageUrl: '/assets/badges/tactical-warrior.png',
      description: 'Awarded for mastering intermediate tactical patterns'
    }
  }
];
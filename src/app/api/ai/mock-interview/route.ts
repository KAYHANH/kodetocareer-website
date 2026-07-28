import { NextResponse } from 'next/server';

interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  sampleAnswerHint: string;
}

const interviewQuestionsBank: Record<string, InterviewQuestion[]> = {
  'fullstack-mern': [
    {
      id: 1,
      question: 'Can you explain the Virtual DOM in React and how reconciliation differs from real DOM manipulation?',
      category: 'React & Frontend',
      sampleAnswerHint: 'Mention React elements, diffing algorithm, Fiber architecture, and batched updates for performance.',
    },
    {
      id: 2,
      question: 'What is the Node.js Event Loop? Explain how non-blocking I/O works with libuv.',
      category: 'Node.js & Backend',
      sampleAnswerHint: 'Discuss call stack, event queue, microtasks (Promises), macrotasks (setTimeout), and single-threaded concurrency.',
    },
    {
      id: 3,
      question: 'How do index scans work in MongoDB versus collection scans, and how do you optimize slow aggregation queries?',
      category: 'Database & MongoDB',
      sampleAnswerHint: 'Explain compound indexes, explain() plan analysis, index cardinality, and avoiding in-memory sorting.',
    },
    {
      id: 4,
      question: 'How do you securely handle JWT authentication, refresh tokens, and CSRF protection in a full-stack MERN application?',
      category: 'Security & Auth',
      sampleAnswerHint: 'Mention HttpOnly SameSite cookies for refresh tokens, short-lived access tokens in memory, and CSRF protection.',
    },
    {
      id: 5,
      question: 'Describe a production bug or performance bottleneck you encountered in a React/Node app and how you resolved it.',
      category: 'System Design & Debugging',
      sampleAnswerHint: 'Use the STAR method: Situation, Task, Action (profiling/caching), Result (e.g. 50% faster API latency).',
    },
  ],
  'data-science': [
    {
      id: 1,
      question: 'What is the difference between Bias and Variance in machine learning, and how do you address overfitting?',
      category: 'Machine Learning Fundamentals',
      sampleAnswerHint: 'Discuss regularization (L1/L2), cross-validation, data augmentation, and model complexity tuning.',
    },
    {
      id: 2,
      question: 'Explain how Random Forests differ from XGBoost/Gradient Boosting algorithms.',
      category: 'Algorithms',
      sampleAnswerHint: 'Mention bagging (independent parallel trees) vs boosting (sequential correction of residual errors).',
    },
    {
      id: 3,
      question: 'How do you handle missing values and severe class imbalance in tabular datasets?',
      category: 'Data Preprocessing',
      sampleAnswerHint: 'Cover SMOTE, class weight adjustment, stratifying folds, and choosing PR-AUC over ROC-AUC.',
    },
    {
      id: 4,
      question: 'Explain the Transformer architecture and the self-attention mechanism used in modern LLMs.',
      category: 'Deep Learning & GenAI',
      sampleAnswerHint: 'Describe Query, Key, Value vectors, scaled dot-product attention, positional encoding, and multi-head attention.',
    },
    {
      id: 5,
      question: 'How do you write optimized SQL queries with CTEs and Window Functions for data analysis?',
      category: 'SQL & Data Engineering',
      sampleAnswerHint: 'Discuss PARTITION BY, ROW_NUMBER(), DENSE_RANK(), and avoiding correlated subqueries.',
    },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, targetRole, questionId, userResponse } = body as {
      action: 'start' | 'evaluate';
      targetRole: string;
      questionId?: number;
      userResponse?: string;
    };

    const roleKey = targetRole in interviewQuestionsBank ? targetRole : 'fullstack-mern';
    const questions = interviewQuestionsBank[roleKey];

    if (action === 'start') {
      return NextResponse.json({
        totalQuestions: questions.length,
        firstQuestion: questions[0],
      });
    }

    if (action === 'evaluate') {
      const qIndex = (questionId || 1) - 1;
      const currentQ = questions[qIndex] || questions[0];
      const answer = (userResponse || '').trim();

      const lengthScore = Math.min(30, Math.round(answer.length / 10));
      const keywordMatches = currentQ.sampleAnswerHint
        .toLowerCase()
        .split(' ')
        .filter((word) => word.length > 4 && answer.toLowerCase().includes(word)).length;

      const techScore = Math.min(50, 20 + keywordMatches * 10);
      const overallScore = Math.min(95, Math.max(40, lengthScore + techScore));

      const isLast = qIndex >= questions.length - 1;
      const nextQuestion = isLast ? null : questions[qIndex + 1];

      let feedback = '';
      if (overallScore >= 80) {
        feedback = 'Excellent answer! You covered core architectural concepts with solid depth.';
      } else if (overallScore >= 60) {
        feedback = 'Good attempt. To get top marks, elaborate more on implementation edge-cases and performance trade-offs.';
      } else {
        feedback = 'Fair answer. Ensure you explain technical terms clearly and provide practical examples.';
      }

      return NextResponse.json({
        questionId: currentQ.id,
        score: overallScore,
        feedback,
        hint: currentQ.sampleAnswerHint,
        isCompleted: isLast,
        nextQuestion,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Mock Interview API error:', error);
    return NextResponse.json({ error: 'Failed to process interview session' }, { status: 500 });
  }
}

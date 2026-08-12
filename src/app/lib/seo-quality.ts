export interface SEOQualityAssessment {
  score: number;
  isIndexable: boolean;
  reasons: string[];
}

export function evaluateSEOQuality(params: {
  title?: string;
  description?: string;
  hasUniqueContent?: boolean;
  hasSchema?: boolean;
  wordCount?: number;
}): SEOQualityAssessment {
  const reasons: string[] = [];
  let score = 0;

  if (params.title && params.title.length >= 20) {
    score += 20;
  } else {
    reasons.push('Title too short or missing');
  }

  if (params.description && params.description.length >= 50) {
    score += 20;
  } else {
    reasons.push('Description too short or missing');
  }

  if (params.hasUniqueContent) {
    score += 30;
  } else {
    reasons.push('Page lacks unique contextual value');
  }

  if (params.hasSchema) {
    score += 15;
  }

  if ((params.wordCount || 0) >= 300) {
    score += 15;
  } else {
    reasons.push('Word count below 300 words');
  }

  // Indexability threshold is 60/100
  const isIndexable = score >= 60;

  return {
    score,
    isIndexable,
    reasons,
  };
}

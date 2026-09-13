import { UploadedStudyMaterial } from './types';

export interface SampleBundle {
  id: string;
  title: string;
  institution: string;
  description: string;
  materials: UploadedStudyMaterial[];
}

export const SAMPLE_BUNDLES: SampleBundle[] = [
  {
    id: 'algorithms-bundle',
    title: 'MIT 6.006: Algorithms & Dynamic Programming',
    institution: 'Massachusetts Institute of Technology',
    description: 'Complete multi-material package: Lecture notes (.pdf), Recitation notes (.docx), and Professor slide deck (.pptx).',
    materials: [
      {
        id: 'sample-mit-pdf',
        name: 'MIT_6006_Unit4_Dynamic_Programming.pdf',
        size: 2450000,
        type: 'pdf',
        wordCount: 1420,
        pageCount: 14,
        status: 'ready',
        isSample: true,
        content: `MIT 6.006: Introduction to Algorithms
Unit 4: Dynamic Programming & Optimal Substructure
Prof. Erik Demaine, Prof. Srini Devadas

1. The Core DP Philosophy: Recursion Without Repetition
Dynamic Programming applies when problems exhibit:
1. Optimal Substructure: An optimal solution contains optimal solutions to subproblems.
2. Overlapping Subproblems: Subproblem space is polynomial, but recursive tree is exponential because calls repeat.

The 5-Step SRI Recipe:
1. Subproblem Definition: State parameters (state space S).
2. Guessing: Local choice per subproblem (choices C).
3. Recurrence Relation: Express DP(i) = min / max / sum of choices.
4. Topological Ordering: Subproblem dependencies must form a Directed Acyclic Graph (DAG).
5. Original Problem Solution: Combine subproblems to answer the query. Total runtime: O(S * C).

Mathematical Invariant:
Subproblems must have no cyclic dependencies:
DP(i) depends strictly on subproblems with strictly smaller index or strictly fewer remaining items.`,
      },
      {
        id: 'sample-mit-docx',
        name: 'MIT_6006_Recitation_Knapsack_Derivation.docx',
        size: 890000,
        type: 'docx',
        wordCount: 980,
        status: 'ready',
        isSample: true,
        content: `MIT 6.006 Recitation 14: 0/1 Knapsack & Longest Common Subsequence
Teaching Assistant: Academic Course Staff

0/1 Knapsack Formal Definition:
Given n items with weights w_1, ..., w_n and values v_1, ..., v_n, and integer capacity W.
Subproblem: DP(i, w) = maximum value using a subset of items {1, ..., i} with total weight at most w.

Recurrence:
If w_i > w:
  DP(i, w) = DP(i - 1, w)
Else:
  DP(i, w) = max(DP(i - 1, w), DP(i - 1, w - w_i) + v_i)

Base Cases:
DP(0, w) = 0 for all w in [0, W]
DP(i, 0) = 0 for all i in [0, n]

Space & Time Complexity:
Time: O(n * W)
Space: O(n * W), reducible to O(W) using rolling row optimization.
Note: O(n * W) is pseudo-polynomial because W is represented in log_2(W) bits.`,
      },
      {
        id: 'sample-mit-pptx',
        name: 'MIT_6006_Lecture_Asymptotic_Notation.pptx',
        size: 4200000,
        type: 'pptx',
        wordCount: 760,
        pageCount: 28,
        status: 'ready',
        isSample: true,
        content: `MIT 6.006 Lecture Slides: Asymptotic Notation & Master Theorem
Department of Electrical Engineering & Computer Science

Slide 1: Asymptotic Bounds Definitions
- Big-O: f(n) = O(g(n)) iff exists c > 0, n_0 > 0 such that 0 <= f(n) <= c * g(n) for all n >= n_0. (Asymptotic Upper Bound)
- Big-Omega: f(n) = Omega(g(n)) iff exists c > 0, n_0 > 0 such that 0 <= c * g(n) <= f(n) for all n >= n_0. (Asymptotic Lower Bound)
- Big-Theta: f(n) = Theta(g(n)) iff f(n) = O(g(n)) and f(n) = Omega(g(n)). (Asymptotic Tight Bound)

Slide 2: Master Theorem Recipe
For recurrence T(n) = a * T(n / b) + f(n):
Compare f(n) with n^(log_b a):
- Case 1: If f(n) = O(n^(log_b a - epsilon)), then T(n) = Theta(n^(log_b a)).
- Case 2: If f(n) = Theta(n^(log_b a) * log^k n), then T(n) = Theta(n^(log_b a) * log^(k+1) n).
- Case 3: If f(n) = Omega(n^(log_b a + epsilon)) and regularity condition holds, then T(n) = Theta(f(n)).`,
      },
    ],
  },
  {
    id: 'ml-bundle',
    title: 'Stanford CS229: Machine Learning & Statistical Estimation',
    institution: 'Stanford University',
    description: 'Complete multi-material package: Course syllabus (.pdf), Derivation guide (.docx), and Lecture slide deck (.pptx).',
    materials: [
      {
        id: 'sample-cs229-pdf',
        name: 'Stanford_CS229_Lecture03_Logistic_Regression.pdf',
        size: 1980000,
        type: 'pdf',
        wordCount: 1650,
        pageCount: 18,
        status: 'ready',
        isSample: true,
        content: `Stanford CS229: Machine Learning
Lecture 3: Logistic Regression & Maximum Likelihood Estimation
Instructor: Andrew Ng

1. Binary Classification Probabilistic Model
We model binary outcome y in {0, 1} conditioned on feature vector x using the logistic sigmoid function:
h_theta(x) = g(theta^T x) = 1 / (1 + exp(-theta^T x))

Properties of Sigmoid:
- Derivative: g'(z) = g(z) * (1 - g(z))
- Asymptotes: lim_{z -> infty} g(z) = 1, lim_{z -> -infty} g(z) = 0.

2. Maximum Likelihood Formulation
Assuming m i.i.d. observations:
L(theta) = prod_{i=1}^m (h_theta(x^(i)))^(y^(i)) * (1 - h_theta(x^(i)))^(1 - y^(i))

Log-Likelihood Function:
l(theta) = sum_{i=1}^m [ y^(i) * ln(h_theta(x^(i))) + (1 - y^(i)) * ln(1 - h_theta(x^(i))) ]

Gradient Ascent Rule:
theta_j := theta_j + alpha * sum_{i=1}^m (y^(i) - h_theta(x^(i))) * x_j^(i)`,
      },
      {
        id: 'sample-cs229-docx',
        name: 'Stanford_CS229_Regularization_Math_Review.docx',
        size: 740000,
        type: 'docx',
        wordCount: 890,
        status: 'ready',
        isSample: true,
        content: `Stanford CS229 Mathematical Review: L1 vs L2 Regularization
Teaching Assistant Notes

L2 Regularization (Ridge Regression):
Cost: J(theta) = (1 / 2m) * ||X theta - y||^2 + (lambda / 2) * ||theta||_2^2
Closed-form normal equations:
theta* = (X^T X + lambda * I)^(-1) * X^T y

Mathematical Invariant:
Since (X^T X + lambda * I) is strictly positive definite for lambda > 0, the matrix is guaranteed to be non-singular and invertible, resolving multicollinearity.

L1 Regularization (Lasso Regression):
Cost: J(theta) = (1 / 2m) * ||X theta - y||^2 + lambda * ||theta||_1
Generates sparse weight vectors because L1 norm contours have sharp diamond corners at axes.`,
      },
      {
        id: 'sample-cs229-pptx',
        name: 'Stanford_CS229_SlideDeck_Bias_Variance.pptx',
        size: 3800000,
        type: 'pptx',
        wordCount: 650,
        pageCount: 22,
        status: 'ready',
        isSample: true,
        content: `Stanford CS229 Lecture Slides: Generalization & Bias-Variance Decomposition
Department of Computer Science

Slide 1: Bias-Variance Error Decomposition
Expected Out-of-Sample Mean Squared Error:
E[(y - f_hat(x))^2] = Bias[f_hat(x)]^2 + Var[f_hat(x)] + sigma_epsilon^2
Where sigma_epsilon^2 is irreducible noise from measurement.

Slide 2: Diagnosis & Remedy Matrix
High Bias (Underfitting):
- Symptoms: High training error, validation error roughly equal to training error.
- Remedies: Add polynomial features, use more expressive model, reduce lambda regularization.

High Variance (Overfitting):
- Symptoms: Low training error, significantly higher validation error (large generalization gap).
- Remedies: Gather more training data, select smaller feature subset, increase lambda regularization.`,
      },
    ],
  },
];

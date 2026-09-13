import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DigitalNotebookResult } from '@/components/DigitalNotebookResult';
import { StructuredOutput } from '@/lib/types';

describe('GeneratedOutput Component (DigitalNotebookResult)', () => {
  const mockQuickSummaryOutput: StructuredOutput = {
    id: 'out-123',
    mode: 'quick_summary',
    createdAt: new Date().toISOString(),
    materials: [
      {
        name: 'Distributed_Systems_Lec01.pdf',
        type: 'pdf',
        wordCount: 1200,
        pageCount: 12,
        charCount: 7500,
      },
    ],
    stats: {
      filesUploaded: 1,
      pagesProcessed: 12,
      charactersExtracted: 7500,
      wordsExtracted: 1200,
    },
    quickSummary: {
      mainTopic: 'Distributed Consensus & Fault Tolerance',
      summary: 'An overview of consensus protocols in asynchronous network environments.',
      coreConcepts: [
        'Byzantine Fault Tolerance',
        'State Machine Replication',
        'Quorum Intersection',
      ],
      keyTakeaways: [
        'Safety cannot be violated during partitions.',
        'Majority quorums guarantee overlap.',
      ],
      importantDefinitions: [
        {
          term: 'FLP Impossibility',
          definition: 'Consensus cannot be guaranteed in asynchronous networks with even 1 crash.',
        },
      ],
      importantFormulas: [
        {
          name: 'Crash Fault Quorum',
          formula: 'Q = \\lfloor N/2 \\rfloor + 1',
          explanation: 'Minimum nodes required for majority consensus.',
        },
      ],
    },
  };

  const mockRevisionNotesOutput: StructuredOutput = {
    ...mockQuickSummaryOutput,
    mode: 'revision_notes',
    revisionNotes: {
      title: 'Revision Guide: Distributed Consensus',
      subjectOrTopic: 'Computer Science 440',
      sections: [
        {
          heading: 'Section 1: Consensus Fundamentals',
          subtopics: [
            {
              subheading: '1.1 Leader Election',
              keyPoints: [
                'Randomized timers prevent split-vote deadlocks.',
                'Heartbeats maintain leadership status.',
              ],
            },
          ],
          examOrientedNotes: [
            'Exam Trap: Leaders cannot commit entries from previous terms directly.',
          ],
        },
      ],
      quickExamTips: [
        'Always check quorum bounds: 2f + 1 for crash, 3f + 1 for Byzantine.',
      ],
    },
  };

  const defaultProps = {
    onSwitchMode: jest.fn(),
    onStartNew: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 5: Generated output component renders correctly
  test('renders quick summary output with topic, takeaways, and definitions', () => {
    render(
      <DigitalNotebookResult
        output={mockQuickSummaryOutput}
        {...defaultProps}
      />
    );

    // Checks main topic header
    expect(
      screen.getByText('Distributed Consensus & Fault Tolerance')
    ).toBeInTheDocument();

    // Checks overview summary text
    expect(
      screen.getByText(/overview of consensus protocols/i)
    ).toBeInTheDocument();

    // Checks core concepts and takeaways
    expect(screen.getByText('Byzantine Fault Tolerance')).toBeInTheDocument();
    expect(screen.getByText('Majority quorums guarantee overlap.')).toBeInTheDocument();

    // Checks important definition
    expect(screen.getByText('FLP Impossibility')).toBeInTheDocument();

    // Checks action buttons with accessible labels
    expect(
      screen.getByRole('button', { name: /export or print notes as pdf/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /copy notes to clipboard as markdown/i })
    ).toBeInTheDocument();
  });

  test('renders revision notes mode output correctly', () => {
    render(
      <DigitalNotebookResult
        output={mockRevisionNotesOutput}
        {...defaultProps}
      />
    );

    expect(
      screen.getByText('Revision Guide: Distributed Consensus')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Section 1: Consensus Fundamentals')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/randomized timers prevent split-vote/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/leaders cannot commit entries from previous terms/i)
    ).toBeInTheDocument();
  });

  test('calls onSwitchMode when mode toggle button is clicked', async () => {
    render(
      <DigitalNotebookResult
        output={mockQuickSummaryOutput}
        {...defaultProps}
      />
    );

    const revisionTab = screen.getByRole('tab', {
      name: /switch to revision notes view/i,
    });
    await userEvent.click(revisionTab);

    expect(defaultProps.onSwitchMode).toHaveBeenCalledWith('revision_notes');
  });
});

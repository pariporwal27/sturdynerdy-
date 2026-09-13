import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeSelectionStage } from '@/components/ModeSelectionStage';
import { OutputMode } from '@/lib/types';

describe('ModeSelectionStage Component', () => {
  const defaultProps = {
    selectedMode: 'quick_summary' as OutputMode,
    onSelectMode: jest.fn(),
    onGenerate: jest.fn(),
    onBackToFiles: jest.fn(),
    totalCharacters: 12500,
    totalFiles: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 2: Summary mode selection works
  test('summary mode selection works and displays selected state', async () => {
    const handleSelectMode = jest.fn();
    render(
      <ModeSelectionStage
        {...defaultProps}
        selectedMode="quick_summary"
        onSelectMode={handleSelectMode}
      />
    );

    const summaryRadio = screen.getByRole('radio', {
      name: /quick summary mode/i,
    });
    expect(summaryRadio).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('summary-selected-icon')).toBeInTheDocument();

    // Click quick summary
    await userEvent.click(summaryRadio);
    expect(handleSelectMode).toHaveBeenCalledWith('quick_summary');
  });

  // Test 3: Revision notes mode selection works
  test('revision notes mode selection works on click and keyboard press', async () => {
    const handleSelectMode = jest.fn();
    const { rerender } = render(
      <ModeSelectionStage
        {...defaultProps}
        selectedMode="quick_summary"
        onSelectMode={handleSelectMode}
      />
    );

    const revisionRadio = screen.getByRole('radio', {
      name: /revision notes mode/i,
    });
    expect(revisionRadio).toHaveAttribute('aria-checked', 'false');

    // Click revision notes
    await userEvent.click(revisionRadio);
    expect(handleSelectMode).toHaveBeenCalledWith('revision_notes');

    // Rerender with revision_notes active
    rerender(
      <ModeSelectionStage
        {...defaultProps}
        selectedMode="revision_notes"
        onSelectMode={handleSelectMode}
      />
    );

    expect(revisionRadio).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('revision-selected-icon')).toBeInTheDocument();

    // Verify keyboard navigation support (Enter key)
    revisionRadio.focus();
    await userEvent.keyboard('{Enter}');
    expect(handleSelectMode).toHaveBeenCalledWith('revision_notes');
  });

  test('calls onGenerate with chosen mode when generate button is clicked', async () => {
    const handleGenerate = jest.fn();
    render(
      <ModeSelectionStage
        {...defaultProps}
        selectedMode="revision_notes"
        onGenerate={handleGenerate}
      />
    );

    const generateBtn = screen.getByRole('button', {
      name: /generate revision notes/i,
    });
    await userEvent.click(generateBtn);

    expect(handleGenerate).toHaveBeenCalledWith('revision_notes');
  });
});

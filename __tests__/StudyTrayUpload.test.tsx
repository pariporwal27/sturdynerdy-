import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StudyTrayUpload } from '@/components/StudyTrayUpload';
import { UploadedStudyMaterial, ExtractionStats } from '@/lib/types';

describe('StudyTrayUpload Component', () => {
  const mockStats: ExtractionStats = {
    filesUploaded: 0,
    pagesProcessed: 0,
    charactersExtracted: 0,
    wordsExtracted: 0,
  };

  const defaultProps = {
    materials: [] as UploadedStudyMaterial[],
    stats: mockStats,
    onAddMaterials: jest.fn(),
    onRemoveMaterial: jest.fn(),
    onProceedToAnalyze: jest.fn(),
    onClearAll: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: File upload component renders
  test('renders file upload dropzone and supported formats', () => {
    render(<StudyTrayUpload {...defaultProps} />);

    // Accessible dropzone region/button
    const dropzone = screen.getByRole('button', {
      name: /upload study materials: drop files or click to browse/i,
    });
    expect(dropzone).toBeInTheDocument();

    // Text content
    expect(
      screen.getByText(/drop lecture slides, textbooks, or notes here/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pdf documents/i)).toBeInTheDocument();
    expect(screen.getByText(/docx word handouts/i)).toBeInTheDocument();
    expect(screen.getByText(/pptx slide decks/i)).toBeInTheDocument();
  });

  // Test 4: Upload validation rejects unsupported files
  test('rejects unsupported file formats and displays extraction error', async () => {
    render(<StudyTrayUpload {...defaultProps} />);

    const dropzone = screen.getByRole('button', {
      name: /upload study materials: drop files or click to browse/i,
    });
    const invalidFile = new File(['binary content'], 'malicious.exe', {
      type: 'application/octet-stream',
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [invalidFile],
      },
    });

    // Error banner should be rendered
    const alertBanner = await screen.findByRole('alert');
    expect(alertBanner).toBeInTheDocument();
    expect(
      screen.getByText(/has an unsupported format/i)
    ).toBeInTheDocument();
  });

  test('displays extracted materials list and calls onRemoveMaterial when clicked', async () => {
    const materials: UploadedStudyMaterial[] = [
      {
        id: 'mat-1',
        name: 'lecture-01.pdf',
        size: 204800,
        type: 'pdf',
        content: 'Sample extracted content',
        status: 'ready',
        wordCount: 150,
        pageCount: 5,
        charCount: 900,
      },
    ];

    const stats: ExtractionStats = {
      filesUploaded: 1,
      pagesProcessed: 5,
      charactersExtracted: 900,
      wordsExtracted: 150,
    };

    render(
      <StudyTrayUpload
        {...defaultProps}
        materials={materials}
        stats={stats}
      />
    );

    expect(screen.getByText('lecture-01.pdf')).toBeInTheDocument();
    expect(screen.getByText(/content successfully extracted/i)).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', {
      name: /remove lecture-01\.pdf from study tray/i,
    });
    await userEvent.click(removeBtn);

    expect(defaultProps.onRemoveMaterial).toHaveBeenCalledWith('mat-1');
  });
});

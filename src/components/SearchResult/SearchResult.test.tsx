import React from 'react';
import { render, screen } from '@testing-library/react';

import SearchResult from './SearchResult';

describe('search-result-title', () => {
  test('events', async () => {
    const title = 'title';
    render(<SearchResult title={title} />);
    expect(screen.getByLabelText('search-result-title')).toHaveTextContent(
      title
    );
  });
});

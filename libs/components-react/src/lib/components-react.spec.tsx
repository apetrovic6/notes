import { render } from '@testing-library/react';

import ComponentsReact from './components-react';

describe('ComponentsReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentsReact />);
    expect(baseElement).toBeTruthy();
  });
});

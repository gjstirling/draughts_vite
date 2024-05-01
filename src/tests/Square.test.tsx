import { render, screen } from '@testing-library/react';
import Square from '../components/Square';

describe('Square component', () => {
  it('renders without crashing', () => {
    render(
      <Square
        coordinates={[0, 0]}
        isSelected={false}
        onCheckerSelected={() => {}}
        moveAction={() => {}}
      />
    );
  });

  it('does not render checker inside the button when not provided', async () => {
    render(
      <Square
      coordinates={[0, 0]}
      isSelected={false}
        onCheckerSelected={() => {}}
        moveAction={() => {}}
      />
    );
    const squareButton = await screen.findByTestId(`square-0-0`);

    expect(squareButton.querySelector('.checker')).not.toBeInTheDocument();
  });

  it('renders checker when provided', () => {
    render(
      <Square
        coordinates={[0, 0]}
        checker="red"
        isSelected={false}
        onCheckerSelected={() => {}}
        moveAction={() => {}}
      />
    );

    console.log(screen.getByTestId('square-0-0'))

    expect(screen.getByTestId('square-0-0').querySelector('.checker')).toBeInTheDocument();
  });
});

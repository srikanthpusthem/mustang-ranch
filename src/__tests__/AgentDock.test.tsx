import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AgentDock } from '@/components/AgentDock';
import { AgentProvider } from '@/components/AgentProvider';

// Mock fetch
global.fetch = vi.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <AgentProvider>
      {component}
    </AgentProvider>
  );
};

describe('AgentDock', () => {
  beforeEach(() => {
    (fetch as any).mockClear();
  });

  it('renders the agent dock button', () => {
    renderWithProvider(<AgentDock />);
    
    const button = screen.getByLabelText('Open AI Wrangler');
    expect(button).toBeInTheDocument();
  });

  it('opens the agent sheet when button is clicked', async () => {
    renderWithProvider(<AgentDock />);
    
    const button = screen.getByLabelText('Open AI Wrangler');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('AI Wrangler')).toBeInTheDocument();
    });
  });

  it('shows welcome message when opened', async () => {
    renderWithProvider(<AgentDock />);
    
    const button = screen.getByLabelText('Open AI Wrangler');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Howdy! I'm your AI wrangler/)).toBeInTheDocument();
    });
  });

  it('sends message when form is submitted', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Test response' }),
    });

    renderWithProvider(<AgentDock />);
    
    const button = screen.getByLabelText('Open AI Wrangler');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('AI Wrangler')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Ask your AI wrangler...');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    // Wait for the button to become enabled
    await waitFor(() => {
      const sendButton = screen.getByRole('button', { name: '' });
      expect(sendButton).not.toBeDisabled();
    });
    
    const sendButton = screen.getByRole('button', { name: '' });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Test message',
          route: '/',
        }),
      });
    });
  });
});

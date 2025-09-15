import { POST } from '@/app/api/agent/route';
import { NextRequest } from 'next/server';

// Mock NextRequest
const createMockRequest = (body: Record<string, unknown>) => {
  return {
    json: async () => body,
  } as NextRequest;
};

describe('/api/agent', () => {
  it('returns response for home route', async () => {
    const request = createMockRequest({
      message: 'Hello',
      route: '/',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toContain('Howdy! Welcome to Mustang Ranch');
    expect(data.questions).toHaveLength(3);
    expect(data.suggestions).toHaveLength(3);
    expect(data.intros).toHaveLength(2);
    expect(data.riskCallout).toBeDefined();
  });

  it('returns response for invest route', async () => {
    const request = createMockRequest({
      message: 'Tell me about investments',
      route: '/invest',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toContain('investment opportunity');
  });

  it('returns mustang-specific response', async () => {
    const request = createMockRequest({
      message: 'I want to invest in mustangs',
      route: '/',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toContain('mustang');
  });

  it('returns barndominium-specific response', async () => {
    const request = createMockRequest({
      message: 'Tell me about barndominiums',
      route: '/',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toContain('barndominium');
  });

  it('returns garden-specific response', async () => {
    const request = createMockRequest({
      message: 'I am interested in community gardens',
      route: '/',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toContain('garden');
  });

  it('handles invalid request body', async () => {
    const request = createMockRequest({ message: '', route: '/' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toBeDefined();
  });
});

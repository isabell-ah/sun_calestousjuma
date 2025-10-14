const API_BASE_URL = 'http://localhost:3001/api';



class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error - please check your connection');
      }
      throw error;
    }
  }

  // Auth endpoints
  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Problems endpoints
  async getProblems(params?: { search?: string; difficulty?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request(`/problems${query ? `?${query}` : ''}`);
  }

  async getProblem(id: string) {
    return this.request(`/problems/${id}`);
  }

  async getRandomProblem(difficulty?: string) {
    const query = difficulty ? `?difficulty=${difficulty}` : '';
    return this.request(`/problems/random${query}`);
  }

  // Submissions endpoints
  async submitCode(data: { problemId: string; code: string; language: string }) {
    return this.request('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMySubmissions() {
    return this.request('/submissions/my');
  }

  // Users endpoints
  async getLeaderboard() {
    return this.request('/users/leaderboard');
  }

  async getUserProfile(id: string) {
    return this.request(`/users/${id}`);
  }

  // Stats endpoints
  async getStats() {
    return this.request('/stats');
  }

  async getProblemStats() {
    return this.request('/stats/problems');
  }

  // Tracks endpoints
  async getTracks() {
    return this.request('/tracks');
  }

  // Execute code
  async executeCode(data: { code: string; language: string; input?: string }) {
    return this.request('/execute', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
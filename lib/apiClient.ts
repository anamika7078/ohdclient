import api from './api';

// Shared types
export interface PaginationParams {
  page?: number;
  limit?: number;
  companyId?: string;
  status?: string;
}

// Auth APIs
export const authAPI = {
  signup: (data: { email: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// Company APIs
export interface CompanyPayload {
  name: string;
  email: string;
  industry?: string;
  employeeCount?: number;
  status?: string;
}

export const companyAPI = {
  getAll: () => api.get('/companies'),
  getById: (id: string) => api.get(`/companies/${id}`),
  create: (data: CompanyPayload) => api.post('/companies', data),
  update: (id: string, data: CompanyPayload) => api.put(`/companies/${id}`, data),
  delete: (id: string) => api.delete(`/companies/${id}`),
};

// Section APIs
export interface SectionPayload {
  name: string;
  description?: string;
  pillar: number;
  order: number;
}

export const sectionAPI = {
  getAll: () => api.get('/sections'),
  create: (data: SectionPayload) => api.post('/sections', data),
  update: (id: string, data: Partial<SectionPayload>) => api.put(`/sections/${id}`, data),
  delete: (id: string) => api.delete(`/sections/${id}`),
};

// Question APIs
export interface QuestionPayload {
  sectionId: string;
  text: string;
  order: number;
}

export const questionAPI = {
  getAll: (sectionId?: string) => {
    const params = sectionId ? { sectionId } : {};
    return api.get('/questions', { params });
  },
  create: (data: QuestionPayload) => api.post('/questions', data),
  update: (id: string, data: Partial<QuestionPayload>) => api.put(`/questions/${id}`, data),
  delete: (id: string) => api.delete(`/questions/${id}`),
};

// Response APIs
export interface AnswerPayload {
  questionId: string;
  rating: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface ResponsePayload {
  companyId: string;
  employeeEmail?: string;
  employeeName?: string;
  answers: AnswerPayload[];
}

export const responseAPI = {
  getByCompany: (companyId: string) => api.get(`/responses/companies/${companyId}`),
  submit: (data: ResponsePayload) => api.post('/responses', data),
};

// Report APIs
export const reportAPI = {
  getCompanyReport: (companyId: string) => api.get(`/reports/companies/${companyId}`),
  getSectionReport: (sectionId: string, companyId?: string) => {
    const params = companyId ? { companyId } : {};
    return api.get(`/reports/sections/${sectionId}`, { params });
  },
  getOverallReport: (companyId?: string) => {
    const params = companyId ? { companyId } : {};
    return api.get('/reports/overall', { params });
  },
};

// Export APIs
export const exportAPI = {
  exportPDF: (companyId: string) => api.get(`/export/companies/${companyId}/pdf`, { responseType: 'blob' }),
  exportExcel: (companyId: string) => api.get(`/export/companies/${companyId}/excel`, { responseType: 'blob' }),
};

// Mail APIs
export const mailAPI = {
  sendBulk: (formData: FormData) =>
    api.post('/mail/bulk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getLogs: (params?: PaginationParams) => api.get('/mail/logs', { params }),
};


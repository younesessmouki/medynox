// Authentication API Service with Axios and HTTP Only Cookies
import apiClient from './api';
import { AxiosError } from 'axios';

// Type definitions
export interface RegisterDoctorRequest {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: 'Male' | 'Female';

  // Professional Information
  mainSpecialty: string;
  secondarySpecialties: string[];
  orderNumber: string;
  experienceYears: number;
  bio: string;

  // Cabinet Information
  cabinetName: string;
  address: string;
  city: string;
  postalCode: string;
  cabinetPhone: string;
  establishmentType: 'cabinet' | 'clinique' | 'centre médical';
  cabinetLogo?: File;

  // Administrative Information
  ice: string;
  if: string;
  cnss?: string;
  rib?: string;

  // Preferences
  language: 'fr' | 'ar' | 'en';
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthResponse {
  accessToken?: string;
  tokenType?: string;
  message?: string;
  email?: string;
  fullName?: string;
}

// API Functions
export const authApi = {
  /**
   * Register a new doctor
   */
  register: async (data: RegisterDoctorRequest): Promise<AuthResponse> => {
    // Send as JSON (file upload will be handled separately if needed)
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login user (JWT stored in HTTP Only cookie by backend)
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    // JWT is automatically stored in HTTP Only cookie by backend
    return response.data;
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post<string>('/auth/verify-email', null, {
      params: { token },
    });
    return { message: response.data };
  },

  /**
   * Request verification email
   */
  requestVerificationEmail: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/request-verification-email', { email });
    return response.data;
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string, confirmPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  /**
   * Logout (clear cookie on backend)
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue even if logout fails
    }
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },

  /**
   * Check if user is authenticated
   * Silently handles 401 errors without logging to console
   */
  checkAuth: async (): Promise<{ authenticated: boolean; user?: any }> => {
    try {
      const response = await apiClient.get('/auth/me', {
        validateStatus: (status) => {
          // Don't treat 401/403 as errors - they're expected when not authenticated
          return status < 500; // Only treat 5xx server errors as actual errors
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        return { authenticated: true, user: response.data };
      }
      // 401/403 means not authenticated - this is normal, not an error
      return { authenticated: false };
    } catch (error: any) {
      // Only catch actual errors (network errors, 5xx, etc.)
      return { authenticated: false };
    }
  },

  /**
   * Refresh access token using refresh token (read from cookie by backend)
   */
  refreshToken: async (): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {});
    return {
      accessToken: response.data.accessToken || '',
      refreshToken: response.data.refreshToken || '',
    };
  },
};

// Note: apiClient is exported from ./api.ts

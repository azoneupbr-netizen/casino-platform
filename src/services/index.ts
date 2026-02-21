// Export all services for easy importing
export { api, getApiBaseUrl } from './api';
export { authService } from './auth';
export { benefitsService } from './benefits';
export type { BenefitStatus, BenefitsResponse, BenefitType } from './benefits';
export { gamesService } from './games';
export type { Game } from './games';
export { paymentsService } from './payments';
export type { DepositRequest, DepositResponse, WithdrawRequest, WithdrawResponse } from './payments';
export { tenantsService } from './tenants';
export type { TenantConfig, TenantStats } from './tenants';
export { walletService } from './wallet';
export type { WalletBalance, Transaction } from './wallet';

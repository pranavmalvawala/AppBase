import { PersonInterface } from '.'

export interface DonationBatchInterface { id?: string, name?: string, batchDate?: Date, donationCount?: number, totalAmount?: number }
export interface DonationInterface { id?: string, batchId?: string, personId?: string, donationDate?: Date, amount?: number, method?: string, methodDetails?: string, notes?: string, person?: PersonInterface, fund?: FundInterface }
export interface DonationSummaryInterface { week: number, donations?: DonationSummaryDonation[] }
export interface DonationSummaryDonation { totalAmount: number, fund?: FundInterface }
export interface FundInterface { id: string, name: string }
export interface FundDonationInterface { id?: string, donationId?: string, fundId?: string, amount?: number, donation?: DonationInterface }
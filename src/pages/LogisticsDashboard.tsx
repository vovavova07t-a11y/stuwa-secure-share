
import React from 'react';
import { LogisticsMetrics } from '@/components/logistics/LogisticsMetrics';
import { ContractsManagement } from '@/components/logistics/ContractsManagement';
import { ContractsProgress } from '@/components/logistics/ContractsProgress';
import { SalesReport } from '@/components/logistics/SalesReport';
import { ProcurementOpportunities } from '@/components/logistics/ProcurementOpportunities';
import { ClientsOverview } from '@/components/logistics/ClientsOverview';
import { CategoryFileSection } from '@/components/CategoryFileSection';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';

export default function LogisticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Управление логистики
          </h1>
          <p className="text-gray-600">
            Система управления логистическими процессами и документооборотом
          </p>
        </div>

        {/* Metrics */}
        <LogisticsMetrics />

        {/* File Management Sections */}
        <div className="grid gap-8">
          <CategoryFileSection
            categoryTitle="Отчеты и аналитика"
            categoryId="logistics_reports"
            description="Отчеты по логистике, аналитика работы"
          />
          
          <CategoryFileSection
            categoryTitle="Клиентская база"
            categoryId="logistics_clients"
            description="Документы и договоры с клиентами"
          />
          
          <CategoryFileSection
            categoryTitle="Транспортировка"
            categoryId="logistics_transportation"
            description="Документы по транспортировке и доставке"
          />
          
          <CategoryFileSection
            categoryTitle="Склад и инвентарь"
            categoryId="logistics_inventory"
            description="Документы по складскому учету"
          />
        </div>

        {/* Business Management */}
        <div className="grid gap-8">
          <ContractsManagement />
          <ContractsProgress />
          <SalesReport />
          <ProcurementOpportunities />
          <ClientsOverview />
        </div>

        {/* Interdepartment Communication */}
        <InterdepartmentSection currentDepartment="logistics" />
      </div>
    </div>
  );
}

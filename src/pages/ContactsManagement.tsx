
import React from 'react';
import { ContactsManagement as ContactsManagementComponent } from '@/components/ContactsManagement';
import { InterdepartmentSection } from '@/components/interdepartment/InterdepartmentSection';
import { Separator } from '@/components/ui/separator';

const ContactsManagement: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <ContactsManagementComponent />
      <Separator />
      <InterdepartmentSection currentDepartment="office" />
    </div>
  );
};

export default ContactsManagement;

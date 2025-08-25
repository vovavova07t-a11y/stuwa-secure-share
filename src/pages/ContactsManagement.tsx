
import React from 'react';
import { ContactsManagement as ContactsManagementComponent } from '@/components/ContactsManagement';

const ContactsManagement: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <ContactsManagementComponent />
    </div>
  );
};

export default ContactsManagement;

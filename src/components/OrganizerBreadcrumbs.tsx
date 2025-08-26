
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface OrganizerBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const OrganizerBreadcrumbs: React.FC<OrganizerBreadcrumbsProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <Shield className="w-4 h-4 text-primary" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.onClick ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-sm hover:text-primary"
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          ) : (
            <span className={item.isActive ? 'text-primary font-medium' : 'text-muted-foreground'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

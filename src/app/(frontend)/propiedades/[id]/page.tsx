import PropertyDetail from '@/features/properties/propertyDetail/PropertyDetailScreen';
import ClientLayout from '@/app/layouts/client/ClientLayout';
import React from 'react'

function page() {
    return (
        <ClientLayout>
          <PropertyDetail/>
        </ClientLayout>
      );
}

export default page
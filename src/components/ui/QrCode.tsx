// src/components/QrCodeField.tsx
'use client';

import React from 'react';
import QRCode from 'qrcode'
import Image from 'next/image'

// Tipo personalizado para las props del campo ui
interface QrCodeFieldProps {
  data?: {
    id?: string; // El ID del documento actual
  };
}

export const QrCodeField: React.FC<QrCodeFieldProps> = ({ data }) => {
  const [qrImage, setQrImage] = React.useState<string>('');

  // Obtener la URL base desde window.location
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const propertyUrl = `${baseUrl}/propiedades/${data?.id || ''}`;

  React.useEffect(() => {
    if (baseUrl && data?.id) {
      QRCode.toDataURL(propertyUrl)
        .then((qrData) => setQrImage(qrData))
        .catch((err) => console.error('Error generando QR:', err));
    }
  }, [baseUrl, data?.id, propertyUrl]);

  return (
    <div>
      <h3>Código QR</h3>
      {qrImage ? (
        <div>
          <Image 
            src={qrImage} 
            alt="Código QR de la propiedad"
            width={200}
            height={200}
          />
          <a href={qrImage} download={`qr-propiedad-${data?.id || 'unknown'}.png`}>
            Descargar QR
          </a>
        </div>
      ) : (
        <p>Generando QR...</p>
      )}
      <p>URL: {propertyUrl}</p>
    </div>
  );
};
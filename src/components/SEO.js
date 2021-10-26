import React from 'react';
import { HeadProvider, Title, Meta } from 'react-head';

export function SEO({ title, description }) {
  const pageTitle = `${title} | PAF`;

  return (
    <HeadProvider>
      <Meta name="referrer" content="no-referrer-when-downgrade" />
      <Meta
        name="description"
        content={
          description === ''
            ? 'Aplicação PAF para uso interno da FSET'
            : description
        }
      />
      <Title>{pageTitle}</Title>
    </HeadProvider>
  );
}

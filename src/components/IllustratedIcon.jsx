import React from 'react';

// Decorative artwork; the adjacent heading supplies the accessible label.
const IllustratedIcon = ({ name, size = 88 }) => (
    <img
        src={`${import.meta.env.BASE_URL}images/icons/${name}.webp`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ display: 'block', objectFit: 'contain', margin: '0 auto', flexShrink: 0 }}
    />
);

export default IllustratedIcon;

import React from 'react';

// Decorative artwork; the adjacent heading supplies the accessible label.
// `order` staggers the ink-draw reveal when several icons appear together.
const IllustratedIcon = ({ name, size = 88, order = 0 }) => (
    <img
        className="illus-icon"
        src={`${import.meta.env.BASE_URL}images/icons/${name}.webp`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ display: 'block', objectFit: 'contain', margin: '0 auto', flexShrink: 0, '--draw-order': order }}
    />
);

export default IllustratedIcon;

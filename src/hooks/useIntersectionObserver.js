import { useEffect, useState, useRef, useCallback } from 'react';

const useIntersectionObserver = ({ threshold = 0.1, triggerOnce = true } = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [node, setNode] = useState(null);
    const observerRef = useRef(null);

    // Callback ref: fires as soon as the DOM node is attached, even if that
    // happens after an initial render where the element was conditionally absent.
    const ref = useCallback((el) => {
        setNode(el);
    }, []);

    useEffect(() => {
        if (!node) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observerRef.current.unobserve(node);
                    }
                }
            },
            { threshold }
        );

        observerRef.current.observe(node);

        return () => {
            if (observerRef.current) {
                observerRef.current.unobserve(node);
            }
        };
    }, [node, threshold, triggerOnce]);

    return [ref, isVisible];
};

export default useIntersectionObserver;

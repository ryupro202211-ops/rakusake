import React, { useEffect, useRef, useState } from 'react';
import '../styles/about.css';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const visibilityClass = isVisible ? 'about__text-box--visible' : 'about__text-box--hidden';

    return (
        <section id="about" className="section-padding about" ref={sectionRef}>
            <div className="about__blob about__blob--yellow"></div>
            <div className="about__blob about__blob--cyan"></div>

            <div className="container about__container">
                <h2 className="about__heading">CONCEPT</h2>

                <div className="about__grid">
                    <div className={`about__text-box ${visibilityClass}`}>
                        <h3 className="about__title">
                            お酒で、ひらく！<br />みんなの心！
                        </h3>
                        <p className="about__text">
                            楽SAKEターミナルは、美味しいお酒をきっかけに、人と人とが自然につながる"場づくり"を大切にしています。
                        </p>
                        <p className="about__text">
                            ただ飲むだけじゃもったいない！<br />
                            出会い・対話・笑顔が生まれる空間で、「また会いたい！」「楽しかった！」と思える瞬間を一緒に作りましょう。
                        </p>
                    </div>

                    <div className={`about__text-box about__text-box--secondary ${visibilityClass}`}>
                        <p className="about__text--bold">
                            日本酒、ワイン、クラフトビール、ハイボール、カクテル...<br />
                            好きなお酒を片手に、新しい仲間と乾杯！
                        </p>
                        <p className="about__text--muted">
                            お酒の好みが違っても大丈夫。コンセプトは「誰でも気軽に、つながれる」。
                            毎回新しいテーマで、ワクワクする出会いをお届けします！
                        </p>
                        <div className="about__highlight-box">
                            "ただの飲み会"じゃない、<br />最高の交流体験を！
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

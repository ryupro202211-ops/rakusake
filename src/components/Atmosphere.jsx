import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import '../styles/atmosphere.css';

const Atmosphere = () => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.2,
        triggerOnce: true,
    });

    const containerClass = isVisible ? 'atmosphere__container--visible' : 'atmosphere__container--hidden';

    return (
        <section id="atmosphere" className="atmosphere" ref={ref}>
            <div className={`container atmosphere__container ${containerClass}`}>
                <h2 className="atmosphere__title">Our Atmosphere</h2>
                <h3 className="atmosphere__subtitle">
                    過去の開催の様子
                </h3>

                <div className="glass-panel atmosphere__content">
                    <p className="atmosphere__text">
                        楽SAKEターミナルは、美味しいお酒を片手に、心と心がつながる出会いを提供する交流イベントを企画・開催しています。<br />
                        SNSやオンラインでのつながりが主流となった今だからこそ、<span className="atmosphere__highlight">「リアルで人と出会い、語り合う時間」</span>の価値を大切にしています。
                    </p>

                    <p className="atmosphere__text">
                        イベントには、20代〜30代を中心とした多彩な参加者が集まり、毎回大盛況。<br />
                        「人と話すのが少し不安…」という方もご安心ください。運営スタッフは明るく、初参加の方も自然と打ち解けられる雰囲気づくりのプロフェッショナル。<span className="atmosphere__highlight">1人参加でも、すぐに仲良くなれる仕掛け</span>がたくさんあります。もちろんお友達との参加も大歓迎です！
                    </p>

                    <p className="atmosphere__text">
                        お酒を通して、初対面の人とも自然に笑い合える。そんな温かく楽しい時間を、あなたも一緒に体験しませんか？<br />
                        仲間を増やしたい方、新しい刺激を求めている方、日常にちょっとしたスパイスがほしい方にぴったりのイベントです。
                    </p>
                </div>

                <div className="atmosphere__deco atmosphere__deco--accent"></div>
                <div className="atmosphere__deco atmosphere__deco--primary"></div>
            </div>
        </section>
    );
};

export default Atmosphere;

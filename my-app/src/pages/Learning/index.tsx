import { useEffect, useRef } from "react";
import LearningList from "../../components/LearningList";
import clsx from "clsx";
import ArtPlayer from 'artplayer';
import Hls from 'hls.js'; // Import Hls.js

import s from './Leaning.module.scss';
import Header from "../../components/Header";
const Learning: React.FC = () => {
    const artPlayerRef = useRef<HTMLDivElement>(null);
    const artPlayerInstance = useRef<ArtPlayer | null>(null);

    useEffect(() => {
        if (artPlayerRef.current) {
            // Nếu đã có instance, thì không khởi tạo mới
            if (artPlayerInstance.current) {
                artPlayerInstance.current.destroy(); // Dọn dẹp instance cũ
            }

            const hls: Hls = new Hls(); // Tạo một instance Hls.js
            hls.loadSource('https://vip.opstream11.com/20220723/34981_6ae66f6b/index.m3u8');
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (artPlayerRef.current) {
                    artPlayerInstance.current = new ArtPlayer({
                        container: artPlayerRef.current,
                        url: hls.url, // Đặt URL từ Hls.js
                        customType: {
                            m3u8: function (video, url) {
                                hls.attachMedia(video);
                            },
                        },
                        // Các tùy chọn khác của Artplayer

                        screenshot: true,
                        setting: true,

                        flip: true,
                        playbackRate: true,
                        aspectRatio: true,
                        fullscreen: true,
                        fullscreenWeb: true,
                        subtitleOffset: true,
                        miniProgressBar: true,
                        localVideo: true,
                        localSubtitle: true,
                        mutex: true,
                        backdrop: true,
                        theme: '#23ade5',
                        lang: 'en',
                        whitelist: ['*'],
                        moreVideoAttr: {
                            crossOrigin: 'anonymous',
                        },
                        settings: [
                            {
                                html: 'Custom option',
                                tooltip: 'Custom tooltip',
                                selector: [
                                    {
                                        html: 'Option 1',
                                        url: 'https://path/to/video.mp4',
                                    },
                                    {
                                        html: 'Option 2',
                                        url: 'https://path/to/another-video.mp4',
                                    },
                                ],
                                onSelect: function (item) {
                                    artPlayerInstance.current.switchUrl(item.url);
                                    return item.html;
                                },
                            },
                        ],
                        controls: [
                            {
                                name: 'forward',
                                position: 'right',
                                html: '>>|',
                                click: function () {
                                    artPlayerInstance.current.seek(artPlayerInstance.current.currentTime + 10);
                                },
                            },
                            {
                                name: 'backward',
                                position: 'right',
                                html: '|<<',
                                click: function () {
                                    artPlayerInstance.current.seek(artPlayerInstance.current.currentTime - 10);
                                },
                            },
                        ],
                    });
                }
            });

            // Dọn dẹp khi component bị unmount
            return () => {
                if (artPlayerInstance.current) {
                    artPlayerInstance.current.destroy();
                    artPlayerInstance.current = null;
                }
                hls.destroy(); // Dọn dẹp instance Hls.js
            };
        }
    }, []);

    return (
        <div>

            <Header />
            <div className={clsx(s['box-learning'])}>
                <div className={clsx(s['content-player'])}>
                    <div ref={artPlayerRef} className={clsx(s['player-learning'])} />
                    <div className={clsx(s['container-content'])}>
                        <h3>
                            Javascript là gì?
                        </h3>

                        <p className={clsx(s['description'])}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente quisquam dicta harum. At molestias fugiat beatae repellendus! Autem, veniam provident perspiciatis, laudantium iure quia, sint excepturi voluptatum quaerat perferendis explicabo?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam totam nihil, magni eaque labore quod ad deserunt facilis molestiae ipsa, nulla at officiis, aliquid dolor repellat cupiditate. Magnam, quis laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quaerat odio illo dignissimos, laboriosam deleniti ab? Assumenda velit cupiditate tempore! Minima doloremque itaque iusto error dicta natus et expedita sunt!
                        </p>
                    </div>
                    
                </div>

                <LearningList />
            </div>
        </div>
    );
};

export default Learning;
